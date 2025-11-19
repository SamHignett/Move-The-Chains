import { useTeamSearch } from '@/features/teams/hooks/useTeamSearch/useTeamSearch';
import { Grid } from '@mui/material';
import TeamConferenceGrid from '@/features/teams/components/TeamConferenceGrid/TeamConferenceGrid';

export default function LeagueTableGrid() {
  const { data: teams, isLoading } = useTeamSearch({
    searchTerm: '',
    sortBy: 'standings',
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (teams === undefined || teams.length === 0) {
    return <div>No Teams Found</div>;
  }

  const conferenceNames = new Set<string>(teams.map((team) => team.conference));

  return (
    <Grid
      container
      spacing={3}
      sx={{
        flexGrow: 1,
        paddingBottom: 5,
      }}
    >
      {[...conferenceNames].map((conference) => (
        <TeamConferenceGrid
          key={conference}
          conferenceName={conference}
          teams={teams.filter((team) => team.conference === conference)}
        />
      ))}
    </Grid>
  );
}
