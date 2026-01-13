'use client';

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useState, SyntheticEvent } from 'react';
import TabBar from '@/components/TabBar/TabBar';
import TabPanel from '@/components/TabPanel/TabPanel';
import { PlayerStats } from '@/features/player/Types';
import StatTable from '@/features/stats/components/StatTable/StatTable';

export type PlayerStatsCardProps = {
  stats: PlayerStats;
};

export default function PlayerStatsCard({ stats }: PlayerStatsCardProps) {
  const [categoryValue, setCategoryValue] = useState(0);
  const [offensiveCategoryValue, setOffensiveCategoryValue] = useState(0);

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
        handleChangeAction={handleCategoryChange}
      />
      <TabPanel value={categoryValue} index={0}>
        <TabBar
          value={offensiveCategoryValue}
          labels={[
            'Passing',
            'Receiving',
            'Rushing',
            'Kicking',
            'Punting',
            'Fumbling',
          ]}
          handleChangeAction={handleOffensiveCategoryChange}
        />
        <TabPanel value={offensiveCategoryValue} index={0}>
          {stats.offensive?.passing != undefined && (
            <StatTable
              category={'Passing'}
              stats={Object.entries(stats.offensive.passing).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          )}
        </TabPanel>
        <TabPanel value={offensiveCategoryValue} index={1}>
          {stats.offensive?.receiving != undefined && (
            <StatTable
              category={'Receiving'}
              stats={Object.entries(stats.offensive.receiving).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          )}
        </TabPanel>
        <TabPanel value={offensiveCategoryValue} index={2}>
          {stats.offensive?.rushing != undefined && (
            <StatTable
              category={'Rushing'}
              stats={Object.entries(stats.offensive.rushing).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          )}
        </TabPanel>
        <TabPanel value={offensiveCategoryValue} index={3}>
          {stats.offensive?.kicking != undefined && (
            <StatTable
              category={'Kicking'}
              stats={Object.entries(stats.offensive.kicking).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          )}
        </TabPanel>
        <TabPanel value={offensiveCategoryValue} index={4}>
          {stats.offensive?.punting != undefined && (
            <StatTable
              category={'Punting'}
              stats={Object.entries(stats.offensive.punting).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          )}
        </TabPanel>
        <TabPanel value={offensiveCategoryValue} index={5}>
          {stats.offensive?.fumbling != undefined && (
            <StatTable
              category={'Fumbling'}
              stats={Object.entries(stats.offensive.fumbling).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          )}
        </TabPanel>
      </TabPanel>
      <TabPanel value={categoryValue} index={1}>
        {stats.defensive != undefined && (
          <StatTable
            category={'Defensive'}
            stats={Object.entries(stats.defensive).map(([key, stat]) => ({
              id: key,
              value: stat.value,
            }))}
          />
        )}
      </TabPanel>
    </Box>
  );
}
