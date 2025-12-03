import 'server-only';

import React from 'react';
import { teamInfoQuery } from '@/features/teams/api/teamInfo';
import TeamInfoCardView from '../client/TeamInfoCard';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { Skeleton } from '@mui/material';

export default async function TeamInfoCard({ teamName }: { teamName: string }) {
  const queryClient = getQueryClient();

  const info = await queryClient.fetchQuery(teamInfoQuery(teamName));

  if (!info) return <div>Error querying team information</div>;

  return <TeamInfoCardView info={info} />;
}

export function TeamInfoCardSkeleton() {
  return <Skeleton variant="rectangular" height={400} />;
}
