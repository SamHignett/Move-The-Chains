'use client';

import { usePlayerInfo } from '@/features/player/hooks/playerInfo/usePlayerInfo';
import PlayerInfoCard from '@/features/player/components/PlayerInfoCard/PlayerInfoCard';

export default function PlayerStatsPage() {
  const { data: playerInfo, isLoading, error } = usePlayerInfo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !playerInfo) {
    return <div>No player information available.</div>;
  }

  console.log(playerInfo);

  return <PlayerInfoCard info={playerInfo} />;
}
