import React, { Suspense } from 'react';
import TeamInfoCard, {
  TeamInfoCardSkeleton,
} from '@/features/teams/components/TeamInfoCard/server/TeamInfoCard';
import TeamStatsCard, {
  TeamStatsCardSkeleton,
} from '@/features/teams/components/TeamStatsCard/server/TeamStatsCard';
import { Stack } from '@mui/system';
import TeamTopPerformersCard, {
  TeamTopPerformersCardSkeleton,
} from '@/features/teams/components/TeamTopPerformersCard/server/TeamTopPerformersCard';
import { Grid } from '@mui/material';
import TeamScheduleCard, {
  TeamScheduleCardSkeleton,
} from '@/features/teams/components/TeamScheduleCard/server/TeamScheduleCard';

export const revalidate = 3600;

export default async function TeamStatsPage({
  params,
}: {
  params: Promise<{ teamName: string }>;
}) {
  let { teamName } = await params;
  teamName = decodeURIComponent(teamName);

  return (
    <Grid container spacing={2} sx={{ height: '100%', width: '100%' }}>
      <Grid size={9}>
        <Stack spacing={3} sx={{ width: '100%' }}>
          <Suspense fallback={<TeamInfoCardSkeleton />}>
            <TeamInfoCard teamName={teamName} />
          </Suspense>
          <Suspense fallback={<TeamStatsCardSkeleton />}>
            <TeamStatsCard teamName={teamName} />
          </Suspense>
          <Suspense fallback={<TeamTopPerformersCardSkeleton />}>
            <TeamTopPerformersCard teamName={teamName} />
          </Suspense>
        </Stack>
      </Grid>
      <Grid size={3}>
        <Suspense fallback={<TeamScheduleCardSkeleton />}>
          <TeamScheduleCard teamName={teamName} />
        </Suspense>
      </Grid>
    </Grid>
  );
}
