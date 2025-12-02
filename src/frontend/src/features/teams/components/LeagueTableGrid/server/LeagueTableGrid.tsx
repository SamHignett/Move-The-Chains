import TeamConferenceGridView from '../client/LeagueTableGrid';
import { teamSearchQuery } from '@/features/teams/api/teamSearch';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { Grid, Skeleton } from '@mui/material';
import { Fragment } from 'react';

export default async function LeagueTableGrid() {
  const queryClient = getQueryClient();

  const teams = await queryClient.fetchQuery(
    teamSearchQuery({
      searchTerm: '',
      sortBy: 'standings',
    }),
  );

  if (teams === undefined || teams.length === 0) {
    return <div>No Teams Found</div>;
  }

  const conferenceNames = new Set<string>(teams.map((team) => team.conference));

  return (
    <TeamConferenceGridView
      teams={teams}
      conferenceNames={[...conferenceNames]}
    />
  );
}

export function LeagueTableGridSkeleton() {
  return (
    <Grid container spacing={3} sx={{ flexGrow: 1, paddingBottom: 5 }}>
      {Array.from({ length: 2 }).map((_, conferenceIndex) => (
        <Fragment key={conferenceIndex + 'Title'}>
          <Grid size={12}>
            <Skeleton
              variant="text"
              height={75}
              sx={{
                alignSelf: 'center',
                animation: 'wave',
                bgcolor: 'rgba(255, 255, 255, 0.13)',
                flexGrow: 0,
              }}
            />
          </Grid>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid size={3} key={index}>
              <Skeleton
                variant="rectangular"
                height={300}
                sx={{
                  animation: 'wave',
                  bgcolor: 'rgba(255, 255, 255, 0.13)',
                }}
              />
            </Grid>
          ))}
        </Fragment>
      ))}
    </Grid>
  );
}
