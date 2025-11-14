import { Box, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { formatCamelCase } from '@/utils/string/StringUtils';
import { PlayerSingleStat } from '@/features/player/Types';
import { usePlayerInfo } from '@/features/player/hooks/usePlayerInfo/usePlayerInfo';

export type StatsCardProps = {
  category: string;
  stats: PlayerSingleStat[];
};

function PlayerName({ playerId }: { playerId: string }) {
  const { data } = usePlayerInfo({ id: playerId });
  return <>{data?.name}</>;
}

export default function PlayerCategoryStatsCard(props: StatsCardProps) {
  return (
    <Box
      sx={{
        '&hover': {
          bgColor: 'background.default',
        },
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
              <Typography variant="h5" key={stat.value}>
                {formatCamelCase(stat.name)}
              </Typography>
            </Grid>
            <Grid size={2}>
              <Typography
                variant="h5"
                key={stat.value}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {stat.value}
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography variant="h5" key={stat.value}>
                <PlayerName playerId={stat.playerID} />
              </Typography>
            </Grid>
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
}
