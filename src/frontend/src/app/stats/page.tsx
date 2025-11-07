'use client';

import { Typography } from '@mui/material';
import LeagueTableGrid from '@/features/teams/components/LeagueTableGrid/LeagueTableGrid';
import TopTeamStatsCard from '@/features/teams/components/TopTeamStatsCard/TopTeamStatsCard';

export default function StatsHomePage() {
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

      <LeagueTableGrid />
      <TopTeamStatsCard />
    </div>
  );
}
