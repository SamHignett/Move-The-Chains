import { TeamSingleStat, TeamStats } from '@/features/teams/Types';

export type StatCategoryConfig<T> = {
  getStats: (team: TeamStats) => T;
  template: T;
};

export function getTopStatsForCategory<T extends Record<string, number>>(
  teamStats: TeamStats[],
  categoryConfig: StatCategoryConfig<T>,
): TeamSingleStat[] {
  const statKeys = Object.keys(categoryConfig.template) as Array<keyof T>;

  return statKeys.map((statKey) => {
    const topTeamForStat = [...teamStats].toSorted((a, b) => {
      const statA = categoryConfig.getStats(a)[statKey];
      const statB = categoryConfig.getStats(b)[statKey];
      return statB - statA;
    })[0];

    return {
      logoURL: topTeamForStat.logoURL,
      name: statKey as string,
      teamName: topTeamForStat.name,
      value: categoryConfig.getStats(topTeamForStat)[statKey],
    };
  });
}
