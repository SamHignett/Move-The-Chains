'use client';

import { useTeamStats } from '@/features/teams/hooks/useTeamStats/useTeamStats';
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { TeamStats } from '@/features/teams/Types';
import { useTeamSearch } from '@/features/teams/hooks/useTeamSearch/useTeamSearch';
import TeamStatsCard from '@/features/teams/components/TeamStatsCard/TeamStatsCard';
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
  const { data: teamStats = [], error, isLoading } = useTeamStats();
  const { data: teams = [] } = useTeamSearch();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading Stats</div>;
  }

  if (teams.length === 0) {
    return <div>No Teams Found</div>;
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
            <TeamStatsCard category={categoryName} stats={topStats} />
          </Grid>
        );
      })}
    </Grid>
  );
}
