'use client';

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useState, SyntheticEvent } from 'react';
import PlayerSingleStatTable from '@/features/stats/components/PlayerStatTable/client/PlayerSingleStatTable';
import TabBar from '@/components/TabBar/TabBar';
import TabPanel from '@/components/TabPanel/TabPanel';
import { PlayerCategoryStats } from '@/features/player/Types';

export type TeamTopPerformersCardProps = {
  topPerformers: PlayerCategoryStats[];
};

export default function TeamTopPerformersCard({
  topPerformers,
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
        labels={topPerformers.map(
          (categoryStats) => categoryStats.categoryName,
        )}
        handleChangeAction={handleCategoryChange}
      />
      {topPerformers.map((categoryStats, index) => {
        return (
          <TabPanel key={index} value={categoryValue} index={index}>
            <PlayerSingleStatTable
              category={categoryStats.categoryName}
              stats={categoryStats.stats}
              players={categoryStats.players}
            />
          </TabPanel>
        );
      })}
    </Box>
  );
}
