'use client';

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useState, SyntheticEvent } from 'react';
import TeamStatTable from '@/features/stats/components/TeamStatTable/TeamStatTable';
import TabBar from '@/components/TabBar/TabBar';
import TabPanel from '@/components/TabPanel/TabPanel';
import { useQuery } from '@tanstack/react-query';
import { teamStatsQuery } from '@/features/teams/api/TeamApi';

export default function TeamStatsCard({ teamName }: { teamName: string }) {
  const { data: stats } = useQuery(teamStatsQuery({ searchTerm: teamName }));

  const [categoryValue, setCategoryValue] = useState(0);
  const [offensiveCategoryValue, setOffensiveCategoryValue] = useState(0);

  if (!stats) {
    return <div>Failed to query team stats</div>;
  }

  const teamStats = stats.find(
    (s) => s.name.toLowerCase() == teamName.toLowerCase(),
  );

  if (!teamStats) {
    return <div>No stats found for team: {teamName}</div>;
  }

  const handleCategoryChange = (_event: SyntheticEvent, newValue: number) => {
    setCategoryValue(newValue);
  };

  const handleOffensiveCategoryChange = (
    _event: SyntheticEvent,
    newValue: number,
  ) => {
    setOffensiveCategoryValue(newValue);
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
      <Typography variant="h3">Stats</Typography>
      <TabBar
        value={categoryValue}
        labels={['Offensive', 'Defensive']}
        handleChange={handleCategoryChange}
      />
      <TabPanel value={categoryValue} index={0}>
        <TabBar
          value={offensiveCategoryValue}
          labels={['Passing', 'Rushing', 'Kicking', 'Punting', 'Fumbling']}
          handleChange={handleOffensiveCategoryChange}
        />
        <TabPanel value={offensiveCategoryValue} index={0}>
          <TeamStatTable
            category={'Passing'}
            stats={Object.entries(teamStats.offensive.passing).map(
              ([key, stat]) => ({ id: key, value: stat.value }),
            )}
          />
        </TabPanel>
        <TabPanel value={offensiveCategoryValue} index={1}>
          <TeamStatTable
            category={'Rushing'}
            stats={Object.entries(teamStats.offensive.rushing).map(
              ([key, stat]) => ({ id: key, value: stat.value }),
            )}
          />
        </TabPanel>
        <TabPanel value={offensiveCategoryValue} index={2}>
          <TeamStatTable
            category={'Kicking'}
            stats={Object.entries(teamStats.offensive.kicking).map(
              ([key, stat]) => ({ id: key, value: stat.value }),
            )}
          />
        </TabPanel>
        <TabPanel value={offensiveCategoryValue} index={3}>
          <TeamStatTable
            category={'Punting'}
            stats={Object.entries(teamStats.offensive.punting).map(
              ([key, stat]) => ({ id: key, value: stat.value }),
            )}
          />
        </TabPanel>
        <TabPanel value={offensiveCategoryValue} index={4}>
          <TeamStatTable
            category={'Fumbling'}
            stats={Object.entries(teamStats.offensive.fumbling).map(
              ([key, stat]) => ({ id: key, value: stat.value }),
            )}
          />
        </TabPanel>
      </TabPanel>
      <TabPanel value={categoryValue} index={1}>
        <TeamStatTable
          category={'Defensive'}
          stats={Object.entries(teamStats.defensive).map(([key, stat]) => ({
            id: key,
            value: stat.value,
          }))}
        />
      </TabPanel>
    </Box>
  );
}
