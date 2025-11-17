import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamStats } from '@/features/teams/Types';
import { Axios } from '@/app/Axios';
export function useTeamStats(options?: {
  searchTerm?: string;
}): UseQueryResult<TeamStats[]> {
  const baseUrl = 'api/team/stats';
  const params = new URLSearchParams();

  if (options?.searchTerm) {
    params.append('searchTerm', options.searchTerm);
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return useQuery({
    queryFn: () => Axios.get(url).then((response) => response.data),
    queryKey: ['teamStats', params.toString()],
    staleTime: 1000 * 60 * 5,
  });
}
