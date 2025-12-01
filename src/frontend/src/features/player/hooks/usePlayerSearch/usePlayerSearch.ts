'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PlayerInfo } from '@/features/player/Types';
import { Fetch } from '@/app/Fetch';
export function usePlayerSearch(
  searchTerm: string,
): UseQueryResult<PlayerInfo[]> {
  return useQuery({
    enabled: Boolean(searchTerm),
    queryFn: () => Fetch<PlayerInfo[]>(`api/player/search/${searchTerm}`),
    queryKey: ['usePlayerSearch', searchTerm],
    staleTime: 1000 * 60 * 60 * 6,
  });
}
