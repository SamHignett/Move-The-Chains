'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Axios } from '@/app/Axios';
import { TeamInfo } from '@/features/teams/types';

export function useTeamSearch(searchTerm: string): UseQueryResult<TeamInfo[]> {
  return useQuery({
    queryKey: ['useTeamSearch', searchTerm],
    queryFn: () =>
      Axios.get(`api/team/search/${searchTerm}`).then(
        (response) => response.data,
      ),
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(searchTerm),
  });
}
