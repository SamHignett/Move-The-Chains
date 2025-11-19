import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamTopPerformers } from '@/features/teams/Types';
import { Axios } from '@/app/Axios';

export function useTeamTopPerformers(options?: {
  searchTerm?: string;
}): UseQueryResult<TeamTopPerformers[]> {
  const baseUrl = `api/team/topPerformers`;

  const params = new URLSearchParams();

  if (options?.searchTerm) params.append('searchTerm', options.searchTerm);

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return useQuery({
    queryFn: () => Axios.get(url).then((response) => response.data),
    queryKey: ['teamTopPerformers', options?.searchTerm],
    staleTime: 1000 * 60 * 5,
  });
}
