'use client';

import { Typography, Grid, Box } from '@mui/material';
import { useTeamSearch } from '@/features/teams/hooks/useTeamSearch/useTeamSearch';
import TeamDivisionTable from '@/features/teams/components/TeamDivisionTable/TeamDivisionTable';

//TODO: Create Conference component to reduce code duplication
export default function StatsHomePage() {
  const { data: teams, isLoading } = useTeamSearch({
    searchTerm: '',
    sortby: 'standings',
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (teams == undefined || teams.length === 0) {
    return <div>No Teams Found</div>;
  }

  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Stats
      </Typography>

      <Box
        sx={{
          alignItems: 'center',
          bgcolor: '#444444',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid size={12}>
            <Typography
              variant="h3"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              NFC
            </Typography>
          </Grid>
          <Grid size={3}>
            <TeamDivisionTable
              divisionName={'NFC North'}
              teams={teams.filter(
                (team) => team.division == 'North' && team.conference == 'NFC',
              )}
            />
          </Grid>
          <Grid size={3}>
            <TeamDivisionTable
              divisionName={'NFC East'}
              teams={teams.filter(
                (team) => team.division == 'East' && team.conference == 'NFC',
              )}
            />
          </Grid>
          <Grid size={3}>
            <TeamDivisionTable
              divisionName={'NFC South'}
              teams={teams.filter(
                (team) => team.division == 'South' && team.conference == 'NFC',
              )}
            />
          </Grid>
          <Grid size={3}>
            <TeamDivisionTable
              divisionName={'NFC West'}
              teams={teams.filter(
                (team) => team.division == 'West' && team.conference == 'NFC',
              )}
            />
          </Grid>
          <Grid size={12}>
            <Typography
              variant="h3"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              AFC
            </Typography>
          </Grid>
          <Grid size={3}>
            <TeamDivisionTable
              divisionName={'AFC North'}
              teams={teams.filter(
                (team) => team.division == 'North' && team.conference == 'AFC',
              )}
            />
          </Grid>
          <Grid size={3}>
            <TeamDivisionTable
              divisionName={'AFC East'}
              teams={teams.filter(
                (team) => team.division == 'East' && team.conference == 'AFC',
              )}
            />
          </Grid>
          <Grid size={3}>
            <TeamDivisionTable
              divisionName={'AF South'}
              teams={teams.filter(
                (team) => team.division == 'South' && team.conference == 'AFC',
              )}
            />
          </Grid>
          <Grid size={3}>
            <TeamDivisionTable
              divisionName={'AFC West'}
              teams={teams.filter(
                (team) => team.division == 'West' && team.conference == 'AFC',
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
