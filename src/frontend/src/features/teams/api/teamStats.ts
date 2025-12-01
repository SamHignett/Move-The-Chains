import { Fetch } from '@/app/Fetch';
import { TeamStats } from '@/features/teams/Types';

export function teamStatsQuery(options?: { searchTerm?: string }) {
  return {
    queryFn: () => fetchTeamStats(options),
    queryKey: ['teamStats', options?.searchTerm ?? ''],
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  };
}

export async function fetchTeamStats(options?: {
  searchTerm?: string;
}): Promise<TeamStats[]> {
  const baseUrl = 'api/team/stats';
  const params = new URLSearchParams();

  if (options?.searchTerm) {
    params.append('searchTerm', options.searchTerm);
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return Fetch(url);
}
