'use client';

import React from 'react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export type TeamInfoCardProps = {
  info: {
    name: string;
    logoURL: string;
    city: string;
    conference: string;
    division: string;
    wins: number;
    losses: number;
    ties: number;
  };
};

export default function TeamInfoCard({ info }: TeamInfoCardProps) {
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
