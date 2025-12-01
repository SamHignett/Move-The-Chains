'use client';

import {
  Card,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { teamScheduleQuery } from '@/features/teams/api/teamSchedule';

export default function TeamScheduleCard({ teamName }: { teamName: string }) {
  const {
    data: schedule,
    error,
    isLoading,
  } = useQuery(teamScheduleQuery(teamName));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !schedule) {
    return <div>No schedule information available.</div>;
  }

  return (
    <Card
      sx={{
        bgcolor: '#004953',
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
  );
}
