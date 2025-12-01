'use client';

import React from 'react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { playerInfoQuery } from '@/features/player/api/playerInfo';
import { useQuery } from '@tanstack/react-query';
import { removeSpaces } from '@/utils/string/StringUtils';

export default function PlayerInfoCard({ playerName }: { playerName: string }) {
  const {
    data: playerInfo,
    error,
    isLoading,
  } = useQuery(playerInfoQuery({ names: [playerName] }));

  if (isLoading) {
    return <div>Loading player info...</div>;
  }

  if (error) {
    return <div>Error querying player info: {error.message}</div>;
  }

  if (!playerInfo) {
    return <div>Failed to query player info</div>;
  }

  const info = playerInfo.find(
    (p) =>
      removeSpaces(p.name.toLowerCase()) ===
      removeSpaces(playerName.toLowerCase()),
  );

  if (!info) {
    return <div>No info found for player: {playerName}</div>;
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
        width: {
          md: '50%',
          sm: '75%',
          xs: '100%',
        },
      }}
    >
      <Box
        component="img"
        src={info.headshotImageUrl}
        alt="Headshot"
        sx={{
          display: { sm: 'block', xs: 'none' },
          flexShrink: 0,
          height: 250,
          width: 300,
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
        <Typography variant="h5">Age: {info.age}</Typography>
        <Typography variant="h5">Height: {info.height}</Typography>
        <Typography variant="h5">Weight: {info.weight} lbs</Typography>
        <Typography variant="h5">School: {info.school}</Typography>
        <Typography variant="h5">Current Team: {info.currentTeam}</Typography>
        <Typography variant="h5">Position: {info.position}</Typography>
      </Box>
    </Box>
  );
}
