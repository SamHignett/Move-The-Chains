import { TeamSingleStat, TeamStats } from '@/features/teams/Types';
import { Stat } from '@/features/stats/Types';

export type StatCategoryConfig<T> = {
  getStats: (team: TeamStats) => T;
  template: T;
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
