'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Axios } from '@/app/Axios';
import { TeamInfo } from '@/features/teams/Types';

export function useTeamSearch(options?: {
  searchTerm?: string;
  sortBy?: string;
}): UseQueryResult<TeamInfo[]> {
  const baseUrl = 'api/team/search';

  const params = new URLSearchParams();

  if (options?.searchTerm) {
    params.append('searchTerm', options.searchTerm);
  }

  if (options?.sortBy) {
    params.append('sortBy', options.sortBy);
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return useQuery({
    queryFn: () => Axios.get(url).then((response) => response.data),
    queryKey: ['useTeamSearch', options?.searchTerm, options?.sortBy],
    staleTime: 1000 * 60 * 10,
  });
}
