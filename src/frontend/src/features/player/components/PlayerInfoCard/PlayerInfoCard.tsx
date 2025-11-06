'use client';

import React from 'react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export type PlayerInfoCardProps = {
  info: {
    id: string;
    name: string;
    age: number;
    height: string;
    weight: number;
    school: string;
    currentTeam: string;
    position: string;
    headshotImageUrl: string;
  };
};

export default function PlayerInfoCard({ info }: PlayerInfoCardProps) {
  const theme = createTheme({
    palette: {
      primary: {
        dark: `#002b30`,
        main: '#004953',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          alignItems: 'flex-start',
          bgcolor: 'primary.main',
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
    </ThemeProvider>
  );
}
