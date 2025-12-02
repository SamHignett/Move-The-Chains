import { Suspense } from 'react';

export const revalidate = 3600;

import PlayerInfoCard, {
  PlayerInfoCardSkeleton,
} from '@/features/player/components/PlayerInfoCard/server/PlayerInfoCard';

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
