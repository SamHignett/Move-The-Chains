'use client';

import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { SportsFootball } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import React from 'react';
import { Search } from '@/components/Search/Search';

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
          <SportsFootball sx={{ display: { xs: `none`, md: `flex` }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: `none`, md: `flex` },
              fontFamily: `monospace`,
              fontWeight: 500,
              letterSpacing: `.2rem`,
              color: `inherit`,
              textDecoration: `none`,
            }}
          >
            Move The Chains
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: `none`, md: `flex` } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: `white`, display: `block` }}
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
