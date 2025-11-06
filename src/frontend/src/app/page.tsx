'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Stack } from '@mui/system';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '15%',
        }}
      >
        Move The Chains
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">Under Construction</Typography>
        <ConstructionIcon
          style={{
            fontSize: 40,
          }}
        />
      </Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '50px',
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            router.push(`/stats`);
          }}
        >
          Stats
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            router.push(`/predictions`);
          }}
        >
          Predictions
        </Button>
      </Stack>
    </div>
  );
}
