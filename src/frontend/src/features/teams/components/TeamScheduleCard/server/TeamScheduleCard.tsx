import TeamScheduleCardView from '../client/TeamScheduleCard';
import { teamScheduleQuery } from '@/features/teams/api/teamSchedule';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { Skeleton } from '@mui/material';

export default async function TeamScheduleCard({
  teamName,
}: {
  teamName: string;
}) {
  const queryClient = getQueryClient();
  const schedule = await queryClient.fetchQuery(teamScheduleQuery(teamName));

  if (!schedule) {
    return <div>No schedule information available.</div>;
  }

  return <TeamScheduleCardView schedule={schedule} />;
}

export function TeamScheduleCardSkeleton() {
  return <Skeleton variant="rectangular" />;
}
