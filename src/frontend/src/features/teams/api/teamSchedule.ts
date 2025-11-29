import { TeamSchedule } from '@/features/teams/Types';
import { Axios } from '@/app/Axios';

export function teamScheduleQuery(teamName: string) {
  return {
    queryFn: () => fetchTeamSchedule(teamName),
    queryKey: ['teamSchedule', teamName],
  };
}

export async function fetchTeamSchedule(
  teamName: string,
): Promise<TeamSchedule> {
  if (!teamName)
    throw new Error('Team name is required to fetch team schedule.');

  const baseUrl = 'api/team/schedule';

  const params = new URLSearchParams();
  params.append('name', teamName);

  const url = `${baseUrl}?${params.toString()}`;

  return Axios.get(url).then((response) => response.data);
}
