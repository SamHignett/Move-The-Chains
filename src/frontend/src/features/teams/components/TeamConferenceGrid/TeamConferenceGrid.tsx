import { Grid, Typography } from '@mui/material';
import TeamDivisionGrid from '@/features/teams/components/TeamDivisionGrid/TeamDivisionGrid';
import { TeamInfo } from '@/features/teams/Types';

export type TeamConferenceGridProps = {
  conferenceName: string;
  teams: Array<TeamInfo>;
};

export default function TeamConferenceGrid({
  conferenceName,
  teams,
}: TeamConferenceGridProps) {
  if (teams.length > 1) {
    const conference = teams[0].conference;

    for (const team of teams) {
      if (team.conference !== conference) {
        return <div>Error: All Teams must be in the same conference</div>;
      }
    }
  }

  const divisionNames = [
    ...new Set<string>(teams.map((team) => team.division)),
  ];
  const conference = divisionNames.map((divisionName) =>
    teams.filter((team) => team.division === divisionName),
  );

  return (
    <>
      <Grid size={12}>
        <Typography
          variant="h3"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {conferenceName}
        </Typography>
      </Grid>
      {conference.map((division) => (
        <Grid size={3} key={division[0].division}>
          <TeamDivisionGrid
            teams={division}
            divisionName={division[0].division}
          />
        </Grid>
      ))}
    </>
  );
}
