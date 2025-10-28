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
        main: '#004953',
        dark: `#002b30`,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: {
            xs: '100%',
            sm: '75%',
            md: '50%',
          },
          padding: 1,
          margin: `auto`,
          bgcolor: 'primary.main',
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <Box
          component="img"
          src={info.headshotImageUrl}
          alt="Headshot"
          sx={{
            width: 300,
            height: 250,
            display: { xs: 'none', sm: 'block' },
            flexShrink: 0,
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
