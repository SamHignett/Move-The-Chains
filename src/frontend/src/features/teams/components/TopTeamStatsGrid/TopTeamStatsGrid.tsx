'use client';

import React from 'react';
import { Grid, Typography } from '@mui/material';
import { TeamStats } from '@/features/teams/Types';
import TopTeamStatsCard from '@/features/teams/components/TopTeamStatsCard/TopTeamStatsCard';
import {
  getTopTeamStatsForCategory,
  StatCategoryConfig,
} from '@/features/teams/utils/StatUtils';
import {
  TeamDefensiveStatsTemplate,
  FumblingStatsTemplate,
  KickingStatsTemplate,
  PassingStatsTemplate,
  PuntingStatsTemplate,
  RushingStatsTemplate,
} from '@/features/teams/StatTemplates';
import { Stat } from '@/features/stats/Types';
import { teamStatsQuery } from '@/features/teams/api/teamStats';
import { useQuery } from '@tanstack/react-query';

const statCategories: Record<
  string,
  StatCategoryConfig<Record<string, Stat>>
> = {
  Defensive: {
    getStats: (team: TeamStats) => team.defensive,
    template: TeamDefensiveStatsTemplate,
  },
  Fumbling: {
    getStats: (team: TeamStats) => team.offensive.fumbling,
    template: FumblingStatsTemplate,
  },
  Kicking: {
    getStats: (team: TeamStats) => team.offensive.kicking,
    template: KickingStatsTemplate,
  },
  Passing: {
    getStats: (team: TeamStats) => team.offensive.passing,
    template: PassingStatsTemplate,
  },
  Punting: {
    getStats: (team: TeamStats) => team.offensive.punting,
    template: PuntingStatsTemplate,
  },
  Rushing: {
    getStats: (team: TeamStats) => team.offensive.rushing,
    template: RushingStatsTemplate,
  },
};

export default function TopTeamStatsGrid() {
  const { data: teamStats = [], error, isLoading } = useQuery(teamStatsQuery());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading Stats: {error.message}</div>;
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
        <Typography variant="h2">Top Team Stats</Typography>
      </Grid>
      {Object.entries(statCategories).map(([categoryName, config]) => {
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
