import 'server-only';

import React from 'react';
import { Grid, Skeleton } from '@mui/material';
import {
  getTopPerformersForStatCategory,
  StatCategories,
} from '@/features/player/utils/StatUtils';
import TopPlayerStatsGridView from '../client/TopPlayerStatsGrid';
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
  return <TopPlayerStatsGridView topStats={topStats} />;
}

export function TopPlayerStatsGridSkeleton() {
  return (
    <Grid container spacing={3} sx={{ flexGrow: 1, paddingBottom: 5 }}>
      {Array.from({ length: Object.keys(StatCategories).length }).map(
        (_, index) => (
          <Grid size={3} key={index}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
        ),
      )}
    </Grid>
  );
}
