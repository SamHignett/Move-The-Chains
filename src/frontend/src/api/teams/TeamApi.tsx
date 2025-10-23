import { Axios } from '@/app/Axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamInfo } from '@/api/teams/responses/TeamInfo';
import { useParams } from 'next/navigation';

export function useTeamInfo(): UseQueryResult<TeamInfo> {
  const { teamName } = useParams<{ teamName: string }>();

  if (!teamName)
    throw new Error('Team name is required to fetch team information.');

  return useQuery({
    queryKey: ['teamInfo', teamName],
    queryFn: () =>
      Axios.get(`api/team/${teamName}/info`).then((response) => response.data),
    staleTime: 1000 * 60 * 5,
  });
}
