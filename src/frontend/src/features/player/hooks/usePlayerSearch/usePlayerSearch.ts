'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PlayerInfo } from '@/features/player/Types';
import { Axios } from '@/app/Axios';
export function usePlayerSearch(
  searchTerm: string,
): UseQueryResult<PlayerInfo[]> {
  return useQuery({
    enabled: Boolean(searchTerm),
    queryFn: () =>
      Axios.get(`api/player/search/${searchTerm}`).then(
        (response) => response.data,
      ),
    queryKey: ['usePlayerSearch', searchTerm],
    staleTime: 1000 * 60 * 5,
  });
}
