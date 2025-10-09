'use client';

import React from 'react';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const TeamInfoCard: React.FC = () => {
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
          src="https://res.cloudinary.com/nflleague/image/private/f_auto/league/puhrqgj71gobgdkdo6uq"
          alt="Philadelphia Eagles logo"
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
          <Typography variant="h4">Philadelphia Eagles</Typography>
          <Typography variant="h5">Location: Philadelphia, PA</Typography>
          <Typography variant="h5">Division/Conference: NFC East</Typography>
          <Typography variant="h6">Current Season Record: 4-1</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export { TeamInfoCard };
