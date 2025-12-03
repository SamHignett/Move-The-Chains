'use client';

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useState, SyntheticEvent } from 'react';
import PlayerStatTable from '@/features/stats/components/PlayerStatTable/PlayerStatTable';
import TabBar from '@/components/TabBar/TabBar';
import TabPanel from '@/components/TabPanel/TabPanel';
import {
  getTopPerformersForStatCategory,
  StatCategories,
} from '@/features/player/utils/StatUtils';
import { TeamTopPerformers } from '@/features/teams/Types';

export type TeamTopPerformersCardProps = {
  teamTopPerformers: TeamTopPerformers;
};

export default function TeamTopPerformersCard({
  teamTopPerformers,
}: TeamTopPerformersCardProps) {
  const [categoryValue, setCategoryValue] = useState(0);

  const handleCategoryChange = (_event: SyntheticEvent, newValue: number) => {
    setCategoryValue(newValue);
  };

  return (
    <Box
      sx={{
        alignItems: 'flex-start',
        bgcolor: '#004953',
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
        handleChangeAction={handleCategoryChange}
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
  );
}
