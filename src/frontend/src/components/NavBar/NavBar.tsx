'use client';

import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { SportsFootball } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import React from 'react';
import Search from '@/components/Search/Search';
import { useRouter } from 'next/navigation';

const NavBar: React.FC = () => {
  const pages = ['stats', 'predictions'];

  const router = useRouter();

  return (
    <div>
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
            variant="button"
            noWrap
            component="a"
            onClick={() => {
              router.push(`/`);
            }}
            sx={{
              color: `inherit`,
              display: { md: `flex`, xs: `none` },
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
                onClick={() => {
                  router.push(`/${page}`);
                }}
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
