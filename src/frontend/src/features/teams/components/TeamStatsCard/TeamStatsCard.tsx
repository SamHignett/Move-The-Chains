'use client';

import { TeamStats } from '@/features/teams/Types';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { useState, SyntheticEvent } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TeamStatTable from '@/features/stats/components/TeamStatTable/TeamStatTable';
import TabBar from '@/components/TabBar/TabBar';
import TabPanel from '@/components/TabPanel/TabPanel';

export type TeamStatsCardProps = {
  stats: TeamStats;
};

export default function TeamStatsCard({ stats }: TeamStatsCardProps) {
  const theme = createTheme({
    palette: {
      primary: {
        dark: `#002b30`,
        main: '#004953',
      },
    },
  });

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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          alignItems: 'flex-start',
          bgcolor: 'primary.main',
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
              stats={Object.entries(stats.offensive.passing).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          </TabPanel>
          <TabPanel value={offensiveCategoryValue} index={1}>
            <TeamStatTable
              category={'Rushing'}
              stats={Object.entries(stats.offensive.rushing).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          </TabPanel>
          <TabPanel value={offensiveCategoryValue} index={2}>
            <TeamStatTable
              category={'Kicking'}
              stats={Object.entries(stats.offensive.kicking).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          </TabPanel>
          <TabPanel value={offensiveCategoryValue} index={3}>
            <TeamStatTable
              category={'Punting'}
              stats={Object.entries(stats.offensive.punting).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          </TabPanel>
          <TabPanel value={offensiveCategoryValue} index={4}>
            <TeamStatTable
              category={'Fumbling'}
              stats={Object.entries(stats.offensive.fumbling).map(
                ([key, stat]) => ({ id: key, value: stat.value }),
              )}
            />
          </TabPanel>
        </TabPanel>
        <TabPanel value={categoryValue} index={1}>
          <TeamStatTable
            category={'Defensive'}
            stats={Object.entries(stats.defensive).map(([key, stat]) => ({
              id: key,
              value: stat.value,
            }))}
          />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
