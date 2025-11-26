'use client';

import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useTeamTopPerformers } from '@/features/teams/hooks/useTeamTopPerformers/useTeamTopPerformers';
import {
  getTopPerformersForStatCategory,
  StatCategories,
} from '@/features/player/utils/StatUtils';
import PlayerCategoryStatsCard from '@/features/player/components/PlayerCategoryStatsCard/PlayerCategoryStatsCard';
export default function TopTeamStatsGrid() {
  const { data: topPerformers = [], error, isLoading } = useTeamTopPerformers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading Stats</div>;
  }

  if (topPerformers === undefined || topPerformers.length === 0) {
    return <div>No Players Found</div>;
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
      {Object.entries(StatCategories).map(([categoryName, config]) => {
        const topStats = getTopPerformersForStatCategory(topPerformers, config);
        return (
          <Grid
            key={'topPlayerStats-' + categoryName}
            size={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <PlayerCategoryStatsCard category={categoryName} stats={topStats} />
          </Grid>
        );
      })}
    </Grid>
  );
}
