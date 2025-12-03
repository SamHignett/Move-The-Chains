'use client';

import {
  Card,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { TeamSchedule } from '@/features/teams/Types';

export type TeamScheduleProps = {
  schedule: TeamSchedule;
};

export default function TeamScheduleCard({ schedule }: TeamScheduleProps) {
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
