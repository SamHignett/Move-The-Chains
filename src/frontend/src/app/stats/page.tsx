import { Suspense } from 'react';
import { Typography } from '@mui/material';
import LeagueTableGrid, {
  LeagueTableGridSkeleton,
} from '@/features/teams/components/LeagueTableGrid/server/LeagueTableGrid';
import TopTeamStatsGrid, {
  TopTeamStatsGridSkeleton,
} from '@/features/teams/components/TopTeamStatsGrid/server/TopTeamStatsGrid';
import TopPlayerStatsGrid, {
  TopPlayerStatsGridSkeleton,
} from '@/features/player/components/TopPlayerStatsGrid/server/TopPlayerStatsGrid';

export const dynamic = 'force-dynamic';

export default function StatsHomePage() {
  return (
    <>
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
      <Suspense fallback={<LeagueTableGridSkeleton />}>
        <LeagueTableGrid />
      </Suspense>
      <Suspense fallback={<TopTeamStatsGridSkeleton />}>
        <TopTeamStatsGrid />
      </Suspense>
      <Suspense fallback={<TopPlayerStatsGridSkeleton />}>
        <TopPlayerStatsGrid />
      </Suspense>
    </>
  );
}
