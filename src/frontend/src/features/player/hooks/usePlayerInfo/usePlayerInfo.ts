'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Axios } from '@/app/Axios';
import { PlayerInfo } from '@/features/player/Types';

export function usePlayerInfo(options?: {
  playerName?: string;
  id?: string;
}): UseQueryResult<PlayerInfo> {
  const routeParams = useParams<{ playerName?: string; playerId?: string }>();

  const baseUrl = `api/player/info`;

  const params = new URLSearchParams();

  const playerName = options?.playerName ?? routeParams.playerName;
  const playerId = options?.id ?? routeParams.playerId;

  if (playerName) params.append('playerName', playerName);

  if (playerId) params.append('id', playerId);

  if (!playerName && !playerId)
    throw new Error(
      'Player name or ID is required to fetch player information.',
    );

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return useQuery({
    queryFn: () => Axios.get(url).then((response) => response.data),
    queryKey: ['playerInfo', playerName, playerId],
    staleTime: 1000 * 60 * 5,
  });
}
