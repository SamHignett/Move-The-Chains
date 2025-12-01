import { Fetch } from '@/app/Fetch';
import { TeamInfo } from '@/features/teams/Types';

export function teamInfoQuery(teamName: string) {
  return {
    queryFn: () => fetchTeamInfo(teamName),
    queryKey: ['teamInfo', teamName],
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  };
}

export async function fetchTeamInfo(teamName: string): Promise<TeamInfo> {
  if (teamName === '')
    throw new Error('Team name is required to fetch team information.');

  const baseUrl = 'api/team/info';

  const params = new URLSearchParams();
  params.append('name', teamName);

  const url = `${baseUrl}?${params.toString()}`;

  return Fetch(url);
}
