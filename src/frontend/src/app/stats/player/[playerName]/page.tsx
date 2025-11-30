import PlayerInfoCard from '@/features/player/components/PlayerInfoCard/PlayerInfoCard';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { playerInfoQuery } from '@/features/player/api/playerInfo';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function PlayerStatsPage({
  params,
}: {
  params: Promise<{ playerName: string }>;
}) {
  let { playerName } = await params;

  playerName = decodeURIComponent(playerName);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(playerInfoQuery({ names: [playerName] }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlayerInfoCard playerName={playerName} />
    </HydrationBoundary>
  );
}
