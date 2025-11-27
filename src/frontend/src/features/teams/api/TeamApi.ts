import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamInfo, TeamStats, TeamTopPerformers } from '@/features/teams/Types';
import { Axios } from '@/app/Axios';

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

  return Axios.get(url).then((response) => response.data)
}

export function getTeamStats(options?: {
  searchTerm?: string;
}): UseQueryResult<TeamStats[]> {
  const baseUrl = 'api/team/stats';
  const params = new URLSearchParams();

  if (options?.searchTerm) {
    params.append('searchTerm', options.searchTerm);
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return useQuery({
    queryFn: () => Axios.get(url).then((response) => response.data),
    queryKey: ['teamStats', params.toString()],
    staleTime: 1000 * 60 * 5,
  });
}

export function getTeamTopPerformers(options?: {
  searchTerm?: string;
}): UseQueryResult<TeamTopPerformers[]> {
  const baseUrl = `api/team/topPerformers`;

  const params = new URLSearchParams();

  if (options?.searchTerm) params.append('searchTerm', options.searchTerm);

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return useQuery({
    queryFn: () => Axios.get(url).then((response) => response.data),
    queryKey: ['teamTopPerformers', options?.searchTerm],
    staleTime: 1000 * 60 * 5,
  });
}
