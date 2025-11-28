import React from 'react';
import { Grid, Typography } from '@mui/material';
import {
  getTopPerformersForStatCategory,
  StatCategories,
} from '@/features/player/utils/StatUtils';
import PlayerCategoryStatsCard from '@/features/player/components/PlayerCategoryStatsCard/PlayerCategoryStatsCard';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { teamTopPerformersQuery } from '@/features/teams/api/teamTopPerformers';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { playerInfoQuery } from '@/features/player/api/playerInfo';

export default async function TopPlayerStatsGrid() {
  const queryClient = getQueryClient();

  const topPerformers = await queryClient.fetchQuery(teamTopPerformersQuery());

  if (!topPerformers || topPerformers.length === 0) {
    return <div>Failed to query team top performers</div>;
  }

  return (
    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
      <Grid
        size={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2">Top Player Stats</Typography>
      </Grid>
      {Object.entries(StatCategories).map(async ([categoryName, config]) => {
        const topStats = getTopPerformersForStatCategory(topPerformers, config);

        const playerIDs = new Set(topStats.map((stat) => stat.playerID));
        await queryClient.prefetchQuery(
          playerInfoQuery({ ids: [...playerIDs] }),
        );

        return (
          <HydrationBoundary
            key={'topPlayerStats-' + categoryName}
            state={dehydrate(queryClient)}
          >
            <Grid
              size={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <PlayerCategoryStatsCard
                category={categoryName}
                stats={topStats}
              />
            </Grid>
          </HydrationBoundary>
        );
      })}
    </Grid>
  );
}
