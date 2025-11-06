'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Axios } from '@/app/Axios';
import { TeamInfo } from '@/features/teams/Types';

export function useTeamSearch(searchTerm: string): UseQueryResult<TeamInfo[]> {
  return useQuery({
    enabled: Boolean(searchTerm),
    queryFn: () =>
      Axios.get(`api/team/search/${searchTerm}`).then(
        (response) => response.data,
      ),
    queryKey: ['useTeamSearch', searchTerm],
    staleTime: 1000 * 60 * 10,
  });
}
