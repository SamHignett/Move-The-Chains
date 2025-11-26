import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamSchedule } from '@/features/teams/Types';
import { Axios } from '@/app/Axios';

export function useTeamSchedule(
  teamName: string,
): UseQueryResult<TeamSchedule> {
  if (!teamName)
    throw new Error('Team name is required to fetch team schedule.');

  const baseUrl = 'api/team/schedule';

  const params = new URLSearchParams();
  params.append('name', teamName);

  const url = `${baseUrl}?${params.toString()}`;

  return useQuery({
    queryFn: () => Axios.get(url).then((response) => response.data),
    queryKey: ['teamSchedule', teamName],
    staleTime: 1000 * 60 * 5,
  });
}
