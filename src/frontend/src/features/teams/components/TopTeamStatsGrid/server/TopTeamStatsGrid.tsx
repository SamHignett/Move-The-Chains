import 'server-only';

import React from 'react';
import { teamStatsQuery } from '@/features/teams/api/teamStats';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { Grid, Skeleton } from '@mui/material';
import { TeamStatCategories } from '@/features/teams/utils/StatUtils';
import TopTeamStatsGridView from '@/features/teams/components/TopTeamStatsGrid/client/TopTeamStatsGrid';

export default async function TopTeamStatsGrid() {
  const queryClient = getQueryClient();

  const teamStats = await queryClient.fetchQuery(teamStatsQuery());

  if (!teamStats) {
    return <div>Error loading Stats</div>;
  }

  return <TopTeamStatsGridView teamStats={teamStats} />;
}

export function TopTeamStatsGridSkeleton() {
  return (
    <Grid container spacing={3} sx={{ flexGrow: 1, paddingBottom: 5 }}>
      <Grid size={12}>
        <Skeleton
          variant="text"
          height={75}
          sx={{
            alignSelf: 'center',
            animation: 'wave',
            bgcolor: 'rgba(255, 255, 255, 0.13)',
            flexGrow: 0,
          }}
        />
      </Grid>
      {Array.from({ length: Object.keys(TeamStatCategories).length }).map(
        (_, index) => (
          <Grid size={3} key={index}>
            <Skeleton
              variant="rectangular"
              height={600}
              sx={{
                animation: 'wave',
                bgcolor: 'rgba(255, 255, 255, 0.13)',
              }}
            />
          </Grid>
        ),
      )}
    </Grid>
  );
}
