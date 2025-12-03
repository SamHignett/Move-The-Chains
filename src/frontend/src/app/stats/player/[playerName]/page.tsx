import { Suspense } from 'react';

import PlayerInfoCard, {
  PlayerInfoCardSkeleton,
} from '@/features/player/components/PlayerInfoCard/server/PlayerInfoCard';

export const revalidate = 3600;

export default async function PlayerStatsPage({
  params,
}: {
  params: Promise<{ playerName: string }>;
}) {
  let { playerName } = await params;
  playerName = decodeURIComponent(playerName);

  return (
    <>
      <Suspense fallback={<PlayerInfoCardSkeleton />}>
        <PlayerInfoCard playerName={playerName} />
      </Suspense>
    </>
  );
}
