'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PlayerInfo } from '@/features/player/Types';
import { playerInfoQuery } from '@/features/player/api/playerInfo';

export function usePlayerInfo(options?: {
  names?: string[];
  ids?: string[];
}): UseQueryResult<PlayerInfo[]> {
  return useQuery(
    playerInfoQuery({ ids: options?.ids, names: options?.names }),
  );
}
