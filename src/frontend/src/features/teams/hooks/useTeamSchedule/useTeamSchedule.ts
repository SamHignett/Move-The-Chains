import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamSchedule } from '@/features/teams/Types';
import { teamScheduleQuery } from '@/features/teams/api/teamSchedule';

export function useTeamSchedule(
  teamName: string,
): UseQueryResult<TeamSchedule> {
  return useQuery(teamScheduleQuery(teamName));
}
