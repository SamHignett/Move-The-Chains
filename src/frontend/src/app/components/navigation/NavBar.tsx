'use client';

import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { SportsFootball } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import React from 'react';
import { Search } from '@/app/components/search/Search';

const NavBar: React.FC = () => {
  const pages = ['Stats', 'Predictions'];

  return (
    <div suppressHydrationWarning>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <SportsFootball sx={{ display: { md: `flex`, xs: `none` }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              color: `inherit`,
              display: { md: `flex`, xs: `none` },
              fontFamily: `monospace`,
              fontWeight: 500,
              letterSpacing: `.2rem`,
              mr: 2,
              textDecoration: `none`,
            }}
          >
            Move The Chains
          </Typography>
          <Box sx={{ display: { md: `flex`, xs: `none` }, flexGrow: 1 }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ color: `white`, display: `block`, my: 2 }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Search />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { NavBar };
