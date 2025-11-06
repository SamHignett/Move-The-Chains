import { Typography } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function StatsHomePage() {
  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20%',
        }}
      >
        Under Construction
        <ConstructionIcon
          style={{
            fontSize: 90,
          }}
        />
      </Typography>
    </div>
  );
}
