import React from 'react';
import TeamInfoCard from '@/features/teams/components/TeamInfoCard/TeamInfoCard';
import TeamStatsCard from '@/features/teams/components/TeamStatsCard/TeamStatsCard';
import { Stack } from '@mui/system';
import TeamTopPerformersCard from '@/features/teams/components/TeamTopPerformersCard/TeamTopPerformersCard';
import { Grid } from '@mui/material';
import TeamScheduleCard from '@/features/teams/components/TeamScheduleCard/TeamScheduleCard';
import { teamStatsQuery } from '@/features/teams/api/teamStats';
import { teamInfoQuery } from '@/features/teams/api/teamInfo';
import { teamScheduleQuery } from '@/features/teams/api/teamSchedule';
import { teamTopPerformersQuery } from '@/features/teams/api/teamTopPerformers';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function TeamStatsPage({
  params,
}: {
  params: Promise<{ teamName: string }>;
}) {
  const { teamName } = await params;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(teamInfoQuery(teamName)),
    queryClient.prefetchQuery(teamStatsQuery({ searchTerm: teamName })),
    queryClient.prefetchQuery(teamTopPerformersQuery({ searchTerm: teamName })),
    queryClient.prefetchQuery(teamScheduleQuery(teamName)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Grid container spacing={2} sx={{ height: '100%', width: '100%' }}>
        <Grid size={9}>
          <Stack spacing={3}>
            <TeamInfoCard teamName={teamName} />
            <TeamStatsCard teamName={teamName} />
            <TeamTopPerformersCard teamName={teamName} />
          </Stack>
        </Grid>
        <Grid size={3}>
          <TeamScheduleCard teamName={teamName} />
        </Grid>
      </Grid>
    </HydrationBoundary>
  );
}
