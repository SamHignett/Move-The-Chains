import { Box, Typography, Grid } from '@mui/material';
import { Fragment } from 'react';
import { TeamInfo } from '@/features/teams/Types';
import Link from 'next/link';

export type TeamDivisionGridProps = {
  divisionName: string;
  teams: TeamInfo[];
};

export default function TeamDivisionGrid({
  divisionName,
  teams,
}: TeamDivisionGridProps) {
  if (teams.length === 0) {
    return <div>No Teams in this Division</div>;
  }

  const division = teams[0].division;
  const conference = teams[0].conference;

  if (teams.length > 1) {
    for (const team of teams) {
      if (team.division !== division || team.conference !== conference) {
        return (
          <div>Error: All Teams must be in the same division/conference</div>
        );
      }
    }
  }

  return (
    <div>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <Grid container spacing={2} sx={{ bgcolor: '#004953' }}>
          <Grid size={12}>
            <Typography
              variant="h4"
              sx={{
                borderBottom: 4,
                borderColor: '#000000',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {conference} - {divisionName}
            </Typography>
          </Grid>
          {teams.map((team) => (
            <Fragment key={team.name}>
              <Grid size={4}>
                <Box
                  component="img"
                  src={team.logoURL}
                  alt="Logo"
                  sx={{
                    display: { sm: 'block', xs: 'none' },
                    flexShrink: 0,
                    height: 50,
                    width: 50,
                  }}
                ></Box>
              </Grid>
              <Grid size={4}>
                <Link href={`/stats/teams/${team.name}`}>
                  <Typography variant="h6">{team.name}</Typography>
                </Link>
              </Grid>
              <Grid size={4}>
                <Typography variant="h5">
                  {team.wins}-{team.losses}-{team.ties}
                </Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
