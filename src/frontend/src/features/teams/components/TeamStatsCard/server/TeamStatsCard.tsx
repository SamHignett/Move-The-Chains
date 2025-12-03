import 'server-only';

import TeamStatsCardView from '../client/TeamStatsCard';
import { teamStatsQuery } from '@/features/teams/api/teamStats';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { Skeleton } from '@mui/material';

export default async function TeamStatsCard({
  teamName,
}: {
  teamName: string;
}) {
  const queryClient = getQueryClient();

  const stats = await queryClient.fetchQuery(
    teamStatsQuery({ searchTerm: teamName }),
  );

  if (!stats) {
    return <div>Failed to query team stats</div>;
  }

  const teamStats = stats.find(
    (s) => s.name.toLowerCase() === teamName.toLowerCase(),
  );

  if (!teamStats) {
    return <div>No stats found for team: {teamName}</div>;
  }

  return <TeamStatsCardView stats={teamStats} />;
}

export function TeamStatsCardSkeleton() {
  return <Skeleton variant="rectangular" height={400} />;
}
