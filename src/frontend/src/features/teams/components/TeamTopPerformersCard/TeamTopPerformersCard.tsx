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
import { useQuery } from '@tanstack/react-query';
import { teamTopPerformersQuery } from '@/features/teams/api/teamTopPerformers';

export default function TeamTopPerformersCard({
  teamName,
}: {
  teamName: string;
}) {
  const [categoryValue, setCategoryValue] = useState(0);

  const {
    data: topPerformers,
    error,
    isLoading,
  } = useQuery(teamTopPerformersQuery({ searchTerm: teamName }));

  if (isLoading) return <div>Loading team top performers...</div>;

  if (error)
    return <div>Error querying team top performers: {error.message}</div>;

  if (!topPerformers) return <div>Failed to query team top performers</div>;

  const teamTopPerformers = topPerformers.find(
    (t) => t.name.toLowerCase() === teamName.toLowerCase(),
  );

  if (!teamTopPerformers) {
    return <div>No top performers found for team: {teamName}</div>;
  }

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
  );
}
