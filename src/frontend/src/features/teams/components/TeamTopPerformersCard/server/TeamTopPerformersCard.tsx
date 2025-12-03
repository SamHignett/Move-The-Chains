import 'server-only';

import TeamTopPerformersCardView from '../client/TeamTopPerformersCard';
import { teamTopPerformersQuery } from '@/features/teams/api/teamTopPerformers';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { Skeleton } from '@mui/material';

export default async function TeamTopPerformersCard({
  teamName,
}: {
  teamName: string;
}) {
  const queryClient = getQueryClient();
  const topPerformers = await queryClient.fetchQuery(
    teamTopPerformersQuery({ searchTerm: teamName }),
  );

  if (!topPerformers) return <div>Failed to query team top performers</div>;

  const teamTopPerformers = topPerformers.find(
    (t) => t.name.toLowerCase() === teamName.toLowerCase(),
  );

  if (!teamTopPerformers) {
    return <div>No top performers found for team: {teamName}</div>;
  }

  return <TeamTopPerformersCardView teamTopPerformers={teamTopPerformers} />;
}

export function TeamTopPerformersCardSkeleton() {
  return <Skeleton variant="rectangular" height={400} />;
}
