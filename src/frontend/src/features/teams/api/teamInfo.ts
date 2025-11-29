import { Axios } from '@/app/Axios';
import { TeamInfo } from '@/features/teams/Types';

export function teamInfoQuery(teamName?: string) {
  if (!teamName)
    throw new Error('Team name is required to get team information.');

  return {
    queryFn: () => fetchTeamInfo(teamName),
    queryKey: ['teamInfo', teamName],
  };
}

export async function fetchTeamInfo(teamName?: string): Promise<TeamInfo> {
  if (!teamName)
    throw new Error('Team name is required to fetch team information.');

  const baseUrl = 'api/team/info';

  const params = new URLSearchParams();
  params.append('name', teamName);

  const url = `${baseUrl}?${params.toString()}`;

  return Axios.get(url).then((response) => response.data);
}
