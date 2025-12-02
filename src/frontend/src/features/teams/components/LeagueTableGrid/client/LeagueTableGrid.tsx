'use client';

import { Grid } from '@mui/material';
import TeamConferenceGrid from '@/features/teams/components/TeamConferenceGrid/TeamConferenceGrid';
import { TeamInfo } from '@/features/teams/Types';

export type LeagueTableGridProps = {
  conferenceNames: string[];
  teams: TeamInfo[];
};

export default function LeagueTableGrid({
  conferenceNames,
  teams,
}: LeagueTableGridProps) {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        flexGrow: 1,
        paddingBottom: 5,
      }}
    >
      {conferenceNames.map((conference) => (
        <TeamConferenceGrid
          key={conference}
          conferenceName={conference}
          teams={teams.filter((team) => team.conference === conference)}
        />
      ))}
    </Grid>
  );
}
