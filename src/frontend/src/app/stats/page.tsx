'use client';

import { Typography } from '@mui/material';
import LeagueTableGrid from '@/features/teams/components/LeagueTableGrid/LeagueTableGrid';
import TopTeamStatsGrid from '@/features/teams/components/TopTeamStatsGrid/TopTeamStatsGrid';
import TopPlayerStatsGrid from '@/features/player/components/TopPlayerStatsGrid/TopPlayerStatsGrid';

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
      <TopTeamStatsGrid />
      <TopPlayerStatsGrid />
    </div>
  );
}
