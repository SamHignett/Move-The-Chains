import React, {Suspense} from 'react';
import TeamInfoCard from '@/features/teams/components/TeamInfoCard/TeamInfoCard';
import TeamStatsCard from '@/features/teams/components/TeamStatsCard/TeamStatsCard';
import {Stack} from '@mui/system';
import TeamTopPerformersCard from '@/features/teams/components/TeamTopPerformersCard/TeamTopPerformersCard';
import {Grid} from '@mui/material';
import TeamScheduleCard from '@/features/teams/components/TeamScheduleCard/TeamScheduleCard';
import {
  getTeamStats,
  getTeamTopPerformers,
  teamInfoQuery,
} from '@/features/teams/api/TeamApi';
import {getQueryClient} from '@/components/ReactQueryProvider/ReactQueryProvider';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';

//TODO: Change data fetching to use `Promise` to group all requests together
export default async function TeamStatsPage({params,}: {
  params: Promise<{ teamName: string }>;
}) {
  const {teamName} = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(teamInfoQuery(teamName));

  /*
  const { data: teamStats } = getTeamStats({ searchTerm: teamName });
  const { teamInfo } = getTeamInfo(teamName);
  const { data: topPerformers } = getTeamTopPerformers({
    searchTerm: teamName,
  });
  if (teamStats === undefined || teamStats.length === 0) {
    return <div>Error accessing team stats.</div>;
  }

  if (teamStats.length > 1) {
    return <div>Multiple teams found with the same name.</div>;
  }

  if (topPerformers === undefined || topPerformers.length === 0) {
    return <div>Error accessing team top performers.</div>;
  }

  if (topPerformers.length > 1) {
    return <div>Multiple sets of top performers found with the same name.</div>;
  }

  */
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Grid container spacing={2} sx={{height: '100%', width: '100%'}}>
        <Grid size={9}>
          <Stack spacing={3}>
            <TeamInfoCard teamName={teamName}/>
          </Stack>
        </Grid>
      </Grid>
    </HydrationBoundary>
  );
}
