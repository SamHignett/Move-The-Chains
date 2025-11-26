'use client';

import {
  AppBar,
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  Toolbar,
  Typography,
  useColorScheme,
} from '@mui/material';
import { SportsFootball } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import Search from '@/components/Search/Search';
import { useRouter } from 'next/navigation';

const NavBar: React.FC = () => {
  const pages = ['stats', 'predictions'];
  const router = useRouter();

  const { mode, setMode } = useColorScheme();
  const handleThemeToggle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMode(event.target.checked ? `dark` : `light`);
    },
    [setMode],
  );

  if (!mode) {
    return;
  }

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
                variant="text"
                sx={{ color: `white`, display: `block`, my: 2 }}
                onClick={() => {
                  router.push(`/${page}`);
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <FormControlLabel
            checked={mode === 'dark'}
            control={<Switch onChange={handleThemeToggle} />}
            label="Dark Mode"
          />
          <Search />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { NavBar };
