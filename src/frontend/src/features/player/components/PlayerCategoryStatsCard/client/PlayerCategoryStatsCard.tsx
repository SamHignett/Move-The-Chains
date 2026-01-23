'use client';

import { Box, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { formatCamelCase, removeSpaces } from '@/utils/string/StringUtils';
import { PlayerInfo, PlayerSingleStat } from '@/features/player/Types';
import { useMemo } from 'react';
import Link from 'next/link';

export type StatsCardProps = {
  category: string;
  stats: PlayerSingleStat[];
  players: PlayerInfo[];
};

export default function PlayerCategoryStatsCard(props: StatsCardProps) {
  const playerNamesById = useMemo(() => {
    if (!props.players) return new Map<string, string>();

    return new Map(props.players.map((p) => [p.id, p.name]));
  }, [props.players]);

  return (
    <Box
      sx={{
        bgcolor: '#004953',
        borderRadius: 1,
      }}
    >
      <Grid container spacing={2} sx={{ bgcolor: '#004953' }}>
        <Grid size={12}>
          <Typography
            variant="h4"
            sx={{
              borderBottom: 4,
              borderColor: '#000000',
              display: 'flex',
              justifyContent: 'center',
              p: 2,
            }}
          >
            {props.category}
          </Typography>
        </Grid>
        {props.stats.map((stat) => (
          <Fragment key={props.category + stat.name}>
            <Grid size={6}>
              <Typography variant="h5">{formatCamelCase(stat.name)}</Typography>
            </Grid>
            <Grid size={2}>
              <Typography
                variant="h5"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {stat.value}
              </Typography>
            </Grid>
            <Grid size={4}>
              <Link
                href={`/stats/player/${encodeURIComponent(removeSpaces(playerNamesById.get(stat.playerID)) || '')}`}
              >
                <Typography variant="h5">
                  {playerNamesById.get(stat.playerID) || 'Unknown Player'}
                </Typography>
              </Link>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
}
