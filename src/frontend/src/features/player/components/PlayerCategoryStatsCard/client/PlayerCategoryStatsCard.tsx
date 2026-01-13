'use client';

import { Box, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { formatCamelCase } from '@/utils/string/StringUtils';
import { PlayerSingleStat } from '@/features/player/Types';
import { useMemo } from 'react';
import { playerInfoQuery } from '@/features/player/api/playerInfo';
import { useQuery } from '@tanstack/react-query';

export type StatsCardProps = {
  category: string;
  stats: PlayerSingleStat[];
};

export default function PlayerCategoryStatsCard(props: StatsCardProps) {
  //console.log(props.stats)

  const playerIDs = useMemo(
    () => [...new Set(props.stats.map((stat) => stat.playerID))],
    [props.stats],
  );

  //console.log(playerIDs);

  const {
    data: players,
    error,
    isLoading,
  } = useQuery({
    ...playerInfoQuery({ ids: playerIDs }),
    enabled: playerIDs.length > 0,
  });

  const playerNameById = useMemo(() => {
    if (!players) return new Map<string, string>();

    return new Map(players.map((p) => [p.id, p.name]));
  }, [players]);

  if (isLoading) return <div>Loading player info...</div>;

  if (error) return <div> Error querying player info: {error.message}</div>;

  //console.log('playerNameById', playerNameById);

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
              <Typography variant="h5">
                {playerNameById.get(stat.playerID) || 'Unknown Player'}
              </Typography>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
}
