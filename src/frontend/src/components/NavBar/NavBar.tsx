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
          <SportsFootball sx={{ display: { xs: `none`, md: `flex` }, mr: 1 }} />
          <Typography
            variant="button"
            noWrap
            component="a"
            onClick={() => {
              router.push(`/`);
            }}
            sx={{
              mr: 2,
              display: { xs: `none`, md: `flex` },
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
