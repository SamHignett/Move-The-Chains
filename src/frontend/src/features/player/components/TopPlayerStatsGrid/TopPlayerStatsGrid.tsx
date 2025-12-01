import React from 'react';
import { Grid, Typography } from '@mui/material';
import {
  getTopPerformersForStatCategory,
  StatCategories,
} from '@/features/player/utils/StatUtils';
import PlayerCategoryStatsCard from '@/features/player/components/PlayerCategoryStatsCard/PlayerCategoryStatsCard';
import { teamTopPerformersQuery } from '@/features/teams/api/teamTopPerformers';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { playerInfoQuery } from '@/features/player/api/playerInfo';
import { PlayerSingleStat } from '@/features/player/Types';

export default async function TopPlayerStatsGrid() {
  const queryClient = getQueryClient();

  const topPerformers = await queryClient.fetchQuery(teamTopPerformersQuery());

  if (!topPerformers || topPerformers.length === 0) {
    return <div>Failed to query team top performers</div>;
  }

  const allPlayerIDs = new Set<string>();
  const topStats: Record<string, PlayerSingleStat[]> = {};

  for (const [categoryName, config] of Object.entries(StatCategories)) {
    topStats[categoryName] = getTopPerformersForStatCategory(
      topPerformers,
      config,
    );
    for (const stat of topStats[categoryName]) allPlayerIDs.add(stat.playerID);
  }

  await queryClient.prefetchQuery(playerInfoQuery({ ids: [...allPlayerIDs] }));

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
      {Object.entries(StatCategories).map(([categoryName]) => {
        return (
          <Grid
            key={categoryName}
            size={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <PlayerCategoryStatsCard
              category={categoryName}
              stats={topStats[categoryName]}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
