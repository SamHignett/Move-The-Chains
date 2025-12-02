import { TeamSingleStat, TeamStats } from '@/features/teams/Types';
import { Stat } from '@/features/stats/Types';
import {
  FumblingStatsTemplate,
  KickingStatsTemplate,
  PassingStatsTemplate,
  PuntingStatsTemplate,
  RushingStatsTemplate,
  TeamDefensiveStatsTemplate,
} from '@/features/teams/StatTemplates';

export type StatCategoryConfig<T> = {
  getStats: (team: TeamStats) => T;
  template: T;
};

export const TeamStatCategories: Record<
  string,
  StatCategoryConfig<Record<string, Stat>>
> = {
  Defensive: {
    getStats: (team: TeamStats) => team.defensive,
    template: TeamDefensiveStatsTemplate,
  },
  Fumbling: {
    getStats: (team: TeamStats) => team.offensive.fumbling,
    template: FumblingStatsTemplate,
  },
  Kicking: {
    getStats: (team: TeamStats) => team.offensive.kicking,
    template: KickingStatsTemplate,
  },
  Passing: {
    getStats: (team: TeamStats) => team.offensive.passing,
    template: PassingStatsTemplate,
  },
  Punting: {
    getStats: (team: TeamStats) => team.offensive.punting,
    template: PuntingStatsTemplate,
  },
  Rushing: {
    getStats: (team: TeamStats) => team.offensive.rushing,
    template: RushingStatsTemplate,
  },
};

export function getTopTeamStatsForCategory<T extends Record<string, Stat>>(
  teamStats: TeamStats[],
  categoryConfig: StatCategoryConfig<T>,
): TeamSingleStat[] {
  const statKeys = Object.keys(categoryConfig.template) as Array<keyof T>;

  if (teamStats.length === 0) return [];

  return statKeys.map((statKey) => {
    const topTeamForStat = [...teamStats].toSorted((a, b) => {
      const statA = categoryConfig.getStats(a)[statKey];
      const statB = categoryConfig.getStats(b)[statKey];
      return statB.value - statA.value;
    })[0];

    return {
      logoURL: topTeamForStat.logoURL,
      name: statKey as string,
      teamName: topTeamForStat.name,
      value: categoryConfig.getStats(topTeamForStat)[statKey].value,
    };
  });
}
