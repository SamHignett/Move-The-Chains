'use client';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import React, { useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { usePlayerSearch } from '@/features/player/hooks/usePlayerSearch/usePlayerSearch';
import { useTeamSearch } from '@/features/teams/hooks/useTeamSearch/useTeamSearch';
import { useRouter } from 'next/navigation';

const SearchField = styled('div')(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  padding: theme.spacing(0, 2),
  pointerEvents: 'none',
  position: 'absolute',
}));

const SearchInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    [theme.breakpoints.up('sm')]: {
      '&:focus': {
        width: '20ch',
      },
      width: '12ch',
    },
    transition: theme.transitions.create('width'),
  },
  color: 'inherit',
  width: '100%',
}));

export default function Search() {
  const [input, setInput] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');

  const { data: players = [] } = usePlayerSearch(search);
  const { data: teams = [] } = useTeamSearch({ searchTerm: search });

  const router = useRouter();

  const debounceSearchChange = useMemo(
    () =>
      debounce((value: string) => {
        if (value.length > 1) setSearch(value);
      }, 1000),
    [],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInput(value);
      debounceSearchChange(value);
    },
    [debounceSearchChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        if (players.length > 0) {
          const url: string = `/stats/player/${encodeURIComponent(players[0].name.replaceAll(' ', ''))}`;
          router.push(url);
        } else if (teams.length > 0) {
          const url: string = `/stats/teams/${encodeURIComponent(teams[0].name.replaceAll(' ', ''))}`;
          router.push(url);
        }
      }
    },
    [players, teams, router],
  );

  React.useEffect(() => {
    return () => {
      debounceSearchChange.cancel();
    };
  }, [debounceSearchChange]);

  return (
    <SearchField>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInputBase
        value={input}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </SearchField>
  );
}
