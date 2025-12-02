import { Grid, Skeleton } from '@mui/material';
import { Stack } from '@mui/system';

export default function Loading() {
  return (
    <Grid container spacing={2}>
      <Grid size={9}>
        <Stack spacing={3}>
          <Skeleton variant="rectangular" height={150} /> {/* TeamInfo */}
          <Skeleton variant="rectangular" height={400} /> {/* TeamStats */}
          <Skeleton variant="rectangular" height={400} /> {/* TopPerformers */}
        </Stack>
      </Grid>
      <Grid size={3}>
        <Skeleton variant="rectangular" height="100%" /> {/* Schedule */}
      </Grid>
    </Grid>
  );
}
