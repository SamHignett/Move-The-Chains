'use client';

import { usePlayerInfo } from '@/features/player/hooks/usePlayerInfo/usePlayerInfo';
import PlayerInfoCard from '@/features/player/components/PlayerInfoCard/PlayerInfoCard';

export default function PlayerStatsPage() {
  const { data: playerInfo, isLoading, error } = usePlayerInfo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !playerInfo) {
    return <div>No player information available.</div>;
  }

  return <PlayerInfoCard info={playerInfo} />;
}
