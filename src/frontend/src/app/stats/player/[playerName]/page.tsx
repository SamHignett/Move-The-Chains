'use client';

import { usePlayerInfo } from '@/api/players/PlayerApi';
import PlayerInfoCard from '@/app/stats/components/player/PlayerInfoCard';

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
