import { PlayerInfo } from '@/features/player/Types';
import { Fetch } from '@/app/Fetch';

export function playerInfoQuery(options?: {
  names?: string[];
  ids?: string[];
}) {
  return {
    queryFn: () => fetchPlayerInfo(options),
    queryKey: ['playerInfo', options?.names ?? [], options?.ids ?? []],
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  };
}

export async function fetchPlayerInfo(options?: {
  names?: string[];
  ids?: string[];
}): Promise<PlayerInfo[]> {
  const baseUrl = `api/player/info`;

  const params = new URLSearchParams();

  const playerNames: string[] = options?.names ?? [];

  const playerIds: string[] = options?.ids ?? [];

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

  return Fetch(url);
}
