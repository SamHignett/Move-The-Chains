'use client';

import { Box, Grid, Typography } from '@mui/material';
import { TeamSingleStat } from '@/features/teams/Types';
import { Fragment } from 'react';
import { formatCamelCase } from '@/utils/string/StringUtils';
import Link from 'next/link';

export type StatsCardProps = {
  category: string;
  stats: TeamSingleStat[];
};

export default function TopTeamStatsCard(props: StatsCardProps) {
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
          <Fragment key={stat.name + stat.value}>
            <Grid size={6}>
              <Typography variant="h5">{formatCamelCase(stat.name)}</Typography>
            </Grid>
            <Grid size={2}>
              <Link href={`/stats/teams/${stat.teamName}`}>
                <Box
                  component="img"
                  src={stat.logoURL}
                  alt={`${stat.teamName} Logo`}
                  sx={{
                    display: { sm: 'block', xs: 'none' },
                    flexShrink: 0,
                    height: 50,
                    width: 50,
                  }}
                />
              </Link>
            </Grid>
            <Grid size={4}>
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
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
}
