'use client';

import React from 'react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { teamInfoQuery } from '@/features/teams/api/teamInfo';
import { useQuery } from '@tanstack/react-query';

export default function TeamInfoCard({ teamName }: { teamName: string }) {
  const { data: info } = useQuery(teamInfoQuery(teamName));

  if (!info) {
    return <div>Loading team information...</div>;
  }

  return (
    <Box
      sx={{
        alignItems: 'flex-start',
        bgcolor: '#004953',
        display: 'flex',
        flexDirection: 'row',
        margin: `auto`,
        padding: 1,
      }}
    >
      <Box
        component="img"
        src={info.logoURL}
        alt="Logo"
        sx={{
          display: { sm: 'block', xs: 'none' },
          flexShrink: 0,
          height: 150,
          width: 150,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Typography variant="h4">{info.name}</Typography>
        <Typography variant="h5">Location: {info.city}</Typography>
        <Typography variant="h5">
          Division/Conference: {info.conference} {info.division}
        </Typography>
        <Typography variant="h6">
          Current Season Record: {info.wins}-{info.losses}-{info.ties}
        </Typography>
      </Box>
    </Box>
  );
}
