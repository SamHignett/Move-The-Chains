import { Grid, Skeleton } from '@mui/material';
import { Stack } from '@mui/system';

export default function Loading() {
  return (
    <Grid container spacing={2}>
      <Grid size={9}>
        <Stack spacing={3}>
          <Skeleton variant="rectangular" height={150} />
          {/* LeagueTableGrid */}
          <Skeleton variant="rectangular" height={400} />
          {/* TopTeamStatsGrid */}
          <Skeleton variant="rectangular" height={400} />
          {/* TopPlayerStatsGrid */}
        </Stack>
      </Grid>
    </Grid>
  );
}
