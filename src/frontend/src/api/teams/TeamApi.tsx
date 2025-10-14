import { Axios } from '@/app/Axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamInfo } from '@/api/teams/responses/teamInfo';

export function useTeamInfo(teamName: string): UseQueryResult<TeamInfo> {
  return useQuery({
    queryKey: ['teamInfo'],
    queryFn: () =>
      Axios.get(`api/team/${teamName}/info`).then((response) => response.data),
  });
}
