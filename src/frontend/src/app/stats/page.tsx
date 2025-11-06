import { Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function StatsHomePage() {
  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '20%',
        }}
      >
        Under Construction
        <ConstructionIcon
          sx={{
            fontSize: 90,
          }}
        />
      </Typography>
    </div>
  );
}
