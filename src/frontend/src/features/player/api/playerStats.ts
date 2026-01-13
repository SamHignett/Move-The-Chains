import { PlayerStats } from '@/features/player/Types';
import { Fetch } from '@/app/Fetch';

export function playerStatsQuery(options?: { name?: string; id?: string }) {
  return {
    queryFn: () => fetchPlayerStats(options),
    queryKey: ['playerStats', options?.name ?? '', options?.id ?? ''],
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  };
}

export async function fetchPlayerStats(options?: {
  name?: string;
  id?: string;
}): Promise<PlayerStats> {
  if (!options?.name && !options?.id) {
    throw new Error(
      'Player name or ID is required to fetch player statistics.',
    );
  }

  const baseUrl = `api/player/stats`;

  const params = new URLSearchParams();

  if (options?.name) {
    params.append('name', options.name);
  } else if (options?.id) {
    params.append('id', options.id);
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return Fetch(url);
}
