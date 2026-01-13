import 'server-only';

import PlayerStatsCardView from '../client/PlayerStatsCard';
import { playerStatsQuery } from '@/features/player/api/playerStats';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { Skeleton } from '@mui/material';

export default async function PlayerStatsCard({
  playerName,
}: {
  playerName: string;
}) {
  const queryClient = getQueryClient();

  const playerStats = await queryClient.fetchQuery(
    playerStatsQuery({ name: playerName }),
  );

  if (!playerStats) {
    return <div>No stats found for player: {playerName}</div>;
  }

  return <PlayerStatsCardView stats={playerStats} />;
}

export function PlayerStatsCardSkeleton() {
  return <Skeleton variant="rectangular" height={400} />;
}
