import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import React, { useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { usePlayerSearch } from '@/features/player/hooks/usePlayerSearch/usePlayerSearch';
import { useTeamSearch } from '@/features/teams/hooks/useTeamSearch/useTeamSearch';
import { useRouter } from 'next/navigation';

const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SearchInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Search() {
  const [input, setInput] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');

  const { data: players = [] } = usePlayerSearch(search);
  const { data: teams = [] } = useTeamSearch(search);

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
