'use client';

import React from 'react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
          src={info.logoURL}
          alt="Logo"
          sx={{
            width: 150,
            height: 150,
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
          <Typography variant="h5">Location: {info.city}</Typography>
          <Typography variant="h5">
            Division/Conference: {info.conference} {info.division}
          </Typography>
          <Typography variant="h6">
            Current Season Record: {info.wins}-{info.losses}-{info.ties}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
