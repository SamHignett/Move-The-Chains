'use client';

import { TeamTopPerformers } from '@/features/teams/Types';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useState, SyntheticEvent } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PlayerStatTable from '@/features/stats/components/PlayerStatTable/PlayerStatTable';
import TabBar from '@/components/TabBar/TabBar';
import TabPanel from '@/components/TabPanel/TabPanel';
import {
  getTopPerformersForStatCategory,
  StatCategories,
} from '@/features/player/utils/StatUtils';

export type TeamTopPerformersCardProps = {
  teamTopPerformers: TeamTopPerformers;
};

export default function TeamTopPerformersCard({
  teamTopPerformers,
}: TeamTopPerformersCardProps) {
  const theme = createTheme({
    palette: {
      primary: {
        dark: `#002b30`,
        main: '#004953',
      },
    },
  });

  const [categoryValue, setCategoryValue] = useState(0);

  const handleCategoryChange = (_event: SyntheticEvent, newValue: number) => {
    setCategoryValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          alignItems: 'flex-start',
          bgcolor: 'primary.main',
          margin: `auto`,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3">Top Performers</Typography>
        <TabBar
          value={categoryValue}
          labels={Object.entries(StatCategories).map(
            ([categoryName]) => categoryName,
          )}
          handleChange={handleCategoryChange}
        />
        {Object.entries(StatCategories).map(([categoryName, config], index) => {
          const topStats = getTopPerformersForStatCategory(
            [teamTopPerformers],
            config,
          );
          return (
            <TabPanel key={categoryName} value={categoryValue} index={index}>
              <PlayerStatTable category={categoryName} stats={topStats} />
            </TabPanel>
          );
        })}
      </Box>
    </ThemeProvider>
  );
}
