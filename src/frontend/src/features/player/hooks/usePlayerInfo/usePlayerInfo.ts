'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Axios } from '@/app/Axios';
import { PlayerInfo } from '@/features/player/Types';

export function usePlayerInfo(options?: {
  names?: string[];
  ids?: string[];
}): UseQueryResult<PlayerInfo[]> {
  const routeParams = useParams<{ playerName?: string; playerId?: string }>();

  const baseUrl = `api/player/info`;

  const params = new URLSearchParams();

  let playerNames: string[] = [];
  if (routeParams.playerName === undefined) {
    if (options !== undefined && options.names !== undefined) {
      playerNames = options.names;
    }
  } else {
    playerNames = [routeParams.playerName];
  }

  let playerIds: string[] = [];
  if (routeParams.playerId === undefined) {
    if (options !== undefined && options.ids !== undefined)
      playerIds = options.ids;
  } else {
    playerIds = [routeParams.playerId];
  }

  if (playerNames.length === 0 && playerIds.length === 0)
    throw new Error(
      'Player name or ID is required to fetch player information.',
    );

  if (playerNames.length > 0) {
    for (const playerName of playerNames) {
      params.append('names', playerName);
    }
  }

  if (playerIds.length > 0) {
    for (const playerId of playerIds) {
      params.append('ids', playerId);
    }
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return useQuery({
    queryFn: () => Axios.get(url).then((response) => response.data),
    queryKey: ['playerInfo', playerNames, playerIds],
    staleTime: 1000 * 60 * 5,
  });
}
