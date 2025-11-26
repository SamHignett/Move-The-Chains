import {
  Card,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useTeamSchedule } from '@/features/teams/hooks/useTeamSchedule/useTeamSchedule';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export type TeamScheduleCardProps = {
  teamName: string;
};

export default function TeamScheduleCard({ teamName }: TeamScheduleCardProps) {
  const { data: schedule, error, isLoading } = useTeamSchedule(teamName);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !schedule) {
    return <div>No schedule information available.</div>;
  }

  const theme = createTheme({
    palette: {
      primary: {
        dark: `#002b30`,
        main: '#004953',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          bgcolor: 'primary.main',
        }}
      >
        <CardHeader
          title={'Schedule'}
          sx={{ color: 'white', textAlign: 'center' }}
        />
        <List>
          {schedule.games.map((game) => (
            <ListItem key={game.id}>
              <Grid
                container
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <Grid size={12}>
                  <Typography
                    variant={'h6'}
                    sx={{
                      alignItems: 'center',
                      color: 'white',
                      justifyContent: 'center',
                    }}
                  >
                    {game.gameWeek}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant={'h6'} sx={{ color: 'white' }}>
                    {game.status}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant={'h6'} sx={{ color: 'white' }}>
                    {game.awayTeamName} at {game.homeTeamName}
                  </Typography>
                </Grid>
                {game.status === 'Completed' && (
                  <Grid size={12}>
                    <Typography variant={'h6'} sx={{ color: 'white' }}>
                      Final Score: {game.awayPoints} - {game.homePoints}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </ListItem>
          ))}
        </List>
      </Card>
    </ThemeProvider>
  );
}
