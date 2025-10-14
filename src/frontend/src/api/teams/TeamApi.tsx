import { Axios } from '@/app/Axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamInfo } from '@/api/teams/responses/TeamInfo';

export function useTeamInfo(teamName: string): UseQueryResult<TeamInfo> {
  return useQuery({
    queryKey: ['teamInfo', teamName],
    queryFn: () =>
      Axios.get(`api/team/${teamName}/info`).then((response) => response.data),
    staleTime: 1000 * 60 * 5,
  });
}
