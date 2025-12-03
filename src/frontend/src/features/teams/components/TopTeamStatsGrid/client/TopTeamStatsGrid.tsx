'use client';

import React from 'react';
import { Grid, Typography } from '@mui/material';
import TopTeamStatsCard from '@/features/teams/components/TopTeamStatsCard/client/TopTeamStatsCard';
import {
  getTopTeamStatsForCategory,
  TeamStatCategories,
} from '@/features/teams/utils/StatUtils';
import { TeamStats } from '@/features/teams/Types';

export type TopTeamStatsGridProps = {
  teamStats: TeamStats[];
};

export default function TopTeamStatsGrid({ teamStats }: TopTeamStatsGridProps) {
  return (
    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
      <Grid
        size={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2">Top Team Stats</Typography>
      </Grid>
      {Object.entries(TeamStatCategories).map(([categoryName, config]) => {
        const topStats = getTopTeamStatsForCategory(teamStats, config);
        return (
          <Grid
            key={categoryName}
            size={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TopTeamStatsCard category={categoryName} stats={topStats} />
          </Grid>
        );
      })}
    </Grid>
  );
}
