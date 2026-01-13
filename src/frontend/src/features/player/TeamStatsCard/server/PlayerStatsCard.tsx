import 'server-only';

import PlayerStatsCardView from '../client/PlayerStatsCard';
import { playerStatsQuery } from '@/features/player/api/playerStats';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { Skeleton } from '@mui/material';
import { removeSpaces } from '@/utils/string/StringUtils';

export default async function PlayerStatsCard({
  playerName,
}: {
  playerName: string;
}) {
  const queryClient = getQueryClient();

  const response = await queryClient.fetchQuery(
    playerStatsQuery({ name: playerName }),
  );

  if (!response) {
    return <div>Failed to query stats</div>;
  }

  const playerStats = response.find(
    (p) => removeSpaces(p.name).toLowerCase() == playerName.toLowerCase(),
  );

  if (!playerStats) {
    return <div>No stats found for player: {playerName}</div>;
  }

  return <PlayerStatsCardView stats={playerStats} />;
}

export function PlayerStatsCardSkeleton() {
  return <Skeleton variant="rectangular" height={400} />;
}
