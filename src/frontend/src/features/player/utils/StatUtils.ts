import { TeamTopPerformers } from '@/features/teams/Types';
import { PlayerSingleStat } from '@/features/player/Types';
import { Stat } from '@/features/stats/Types';
import {
  KickingStatsTemplate,
  PassingStatsTemplate,
  PlayerDefensiveStatsTemplate,
  PuntingStatsTemplate,
  ReceivingStatsTemplate,
  RushingStatsTemplate,
} from '@/features/teams/StatTemplates';

export type StatCategoryConfig<T> = {
  getStats: (topPerformers: TeamTopPerformers) => T;
  template: T;
};

export const StatCategories: Record<
  string,
  StatCategoryConfig<Record<string, Stat>>
> = {
  Defensive: {
    getStats: (topPerformers: TeamTopPerformers) => topPerformers.defensive,
    template: PlayerDefensiveStatsTemplate,
  },
  Kicking: {
    getStats: (topPerformers: TeamTopPerformers) => topPerformers.kicking,
    template: KickingStatsTemplate,
  },
  Passing: {
    getStats: (topPerformers: TeamTopPerformers) => topPerformers.passing,
    template: PassingStatsTemplate,
  },
  Punting: {
    getStats: (topPerformers: TeamTopPerformers) => topPerformers.punting,
    template: PuntingStatsTemplate,
  },
  Receiving: {
    getStats: (topPerformers: TeamTopPerformers) => topPerformers.receiving,
    template: ReceivingStatsTemplate,
  },
  Rushing: {
    getStats: (topPerformers: TeamTopPerformers) => topPerformers.rushing,
    template: RushingStatsTemplate,
  },
};

export function getTopPerformersForStatCategory<T extends Record<string, Stat>>(
  teamTopPerformers: TeamTopPerformers[],
  categoryConfig: StatCategoryConfig<T>,
): PlayerSingleStat[] {
  const statKeys = Object.keys(categoryConfig.template) as Array<keyof T>;

  if (teamTopPerformers.length === 0) return [];

  if (teamTopPerformers.length === 1) {
    return statKeys.map((statKey) => {
      const stat = categoryConfig.getStats(teamTopPerformers[0])[statKey];

      return {
        name: statKey as string,
        playerID: stat.id,
        value: stat.value,
      };
    });
  }
  return statKeys.map((statKey) => {
    const topPlayerForStat = [...teamTopPerformers].toSorted((a, b) => {
      const statA = categoryConfig.getStats(a)[statKey];
      const statB = categoryConfig.getStats(b)[statKey];
      return statB.value - statA.value;
    })[0];

    return {
      name: statKey as string,
      playerID: categoryConfig.getStats(topPlayerForStat)[statKey].id,
      value: categoryConfig.getStats(topPlayerForStat)[statKey].value,
    };
  });
}
