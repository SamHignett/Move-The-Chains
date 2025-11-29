import { Axios } from '@/app/Axios';
import { TeamStats } from '@/features/teams/Types';

export function teamStatsQuery(options?: { searchTerm?: string }) {
  return {
    queryFn: () => fetchTeamStats(options),
    queryKey: ['teamStats', options?.searchTerm],
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

  return Axios.get(url).then((response) => response.data);
}
