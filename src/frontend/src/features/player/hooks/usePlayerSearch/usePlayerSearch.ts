'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PlayerInfo } from '@/features/player/types';
import { Axios } from '@/app/Axios';
export function usePlayerSearch(
  searchTerm: string,
): UseQueryResult<PlayerInfo[]> {
  return useQuery({
    queryKey: ['usePlayerSearch', searchTerm],
    queryFn: () =>
      Axios.get(`api/player/search/${searchTerm}`).then(
        (response) => response.data,
      ),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(searchTerm),
  });
}
