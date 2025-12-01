import { TeamSchedule } from '@/features/teams/Types';
import { Fetch } from '@/app/Fetch';

export function teamScheduleQuery(teamName: string) {
  return {
    queryFn: () => fetchTeamSchedule(teamName),
    queryKey: ['teamSchedule', teamName],
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  };
}

export async function fetchTeamSchedule(
  teamName: string,
): Promise<TeamSchedule> {
  if (teamName === '')
    throw new Error('Team name is required to fetch team schedule.');

  const baseUrl = 'api/team/schedule';

  const params = new URLSearchParams();
  params.append('name', teamName);

  const url = `${baseUrl}?${params.toString()}`;

  return Fetch(url);
}
