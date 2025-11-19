import { TeamTopPerformers } from '@/features/teams/Types';
import { PlayerSingleStat } from '@/features/player/Types';
import { Stat } from '@/features/stats/Types';

export type StatCategoryConfig<T> = {
  getStats: (topPerformers: TeamTopPerformers) => T;
  template: T;
};

export function getTopPerformersForStatCategory<T extends Record<string, Stat>>(
  teamTopPerformers: TeamTopPerformers[],
  categoryConfig: StatCategoryConfig<T>,
): PlayerSingleStat[] {
  const statKeys = Object.keys(categoryConfig.template) as Array<keyof T>;

  if (teamTopPerformers.length === 0) return [];

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
