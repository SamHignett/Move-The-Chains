import { Typography } from '@mui/material';
import LeagueTableGrid from '@/features/teams/components/LeagueTableGrid/LeagueTableGrid';
import TopTeamStatsGrid from '@/features/teams/components/TopTeamStatsGrid/TopTeamStatsGrid';
import TopPlayerStatsGrid from '@/features/player/components/TopPlayerStatsGrid/TopPlayerStatsGrid';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { teamSearchQuery } from '@/features/teams/api/teamSearch';
import { teamStatsQuery } from '@/features/teams/api/teamStats';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { teamTopPerformersQuery } from '@/features/teams/api/teamTopPerformers';

export default async function StatsHomePage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(teamStatsQuery()),
    queryClient.prefetchQuery(teamTopPerformersQuery()),
    queryClient.prefetchQuery(
      teamSearchQuery({
        searchTerm: '',
        sortBy: 'standings',
      }),
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Typography
        variant="h1"
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Stats
      </Typography>
      <LeagueTableGrid />
      <TopTeamStatsGrid />
      <TopPlayerStatsGrid />
    </HydrationBoundary>
  );
}
