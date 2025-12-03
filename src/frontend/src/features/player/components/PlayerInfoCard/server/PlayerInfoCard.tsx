import 'server-only';

import React from 'react';
import { Skeleton } from '@mui/material';
import { playerInfoQuery } from '@/features/player/api/playerInfo';
import { removeSpaces } from '@/utils/string/StringUtils';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';

import PlayerInfoCardView from '../client/PlayerInfoCard';
export default async function PlayerInfoCard({
  playerName,
}: {
  playerName: string;
}) {
  const queryClient = getQueryClient();

  const playerInfo = await queryClient.fetchQuery(
    playerInfoQuery({ names: [playerName] }),
  );

  if (!playerInfo) {
    return <div>Failed to query player info</div>;
  }

  const info = playerInfo.find(
    (p) =>
      removeSpaces(p.name.toLowerCase()) ===
      removeSpaces(playerName.toLowerCase()),
  );

  if (!info) {
    return <div>No info found for player: {playerName}</div>;
  }

  return <PlayerInfoCardView info={info} />;
}

export function PlayerInfoCardSkeleton() {
  return <Skeleton variant="rectangular" height={400} />;
}
