'use client';

import React from 'react';
import { Grid, Typography } from '@mui/material';
import { StatCategories } from '@/features/player/utils/StatUtils';
import PlayerCategoryStatsCard from '@/features/player/components/PlayerCategoryStatsCard/client/PlayerCategoryStatsCard';
import { PlayerInfo, PlayerSingleStat } from '@/features/player/Types';

export type TopPlayerStatsGridProps = {
  topStats: Record<string, PlayerSingleStat[]>;
  players: PlayerInfo[];
};

export default function TopPlayerStatsGrid({
  players,
  topStats,
}: TopPlayerStatsGridProps) {
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
              players={players.filter((p) =>
                topStats[categoryName].some((stat) => stat.playerID === p.id),
              )}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
