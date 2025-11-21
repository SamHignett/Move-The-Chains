import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamSchedule } from '@/features/teams/Types';
import { Axios } from '@/app/Axios';

export function useTeamSchedule(
  teamName: string,
): UseQueryResult<TeamSchedule> {
  if (!teamName) throw new Error('Team ID is required to fetch team schedule.');

  return useQuery({
    queryFn: () =>
      Axios.get(`api/team/${teamName}/schedule`).then(
        (response) => response.data,
      ),
    queryKey: ['teamSchedule', teamName],
    staleTime: 1000 * 60 * 5,
  });
}
