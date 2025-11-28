import {
  TeamInfo,
  TeamSchedule,
  TeamStats,
  TeamTopPerformers,
} from '@/features/teams/Types';
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

  return Axios.get(url).then((response) => response.data);
}

export function teamStatsQuery(options?: { searchTerm?: string }) {
  return {
    queryFn: () => fetchTeamStats(options),
    queryKey: ['teamStats', options?.searchTerm],
  };
}

export async function fetchTeamStats(options?: {
  searchTerm?: string;
}): Promise<TeamStats[]> {
  const baseUrl = 'api/team/stats';
  const params = new URLSearchParams();

  if (options?.searchTerm) {
    params.append('searchTerm', options.searchTerm);
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return Axios.get(url).then((response) => response.data);
}

export function teamTopPerformersQuery(options?: { searchTerm?: string }) {
  return {
    queryFn: () => fetchTeamTopPerformers(options),
    queryKey: ['teamTopPerformers', options?.searchTerm],
  };
}

export async function fetchTeamTopPerformers(options?: {
  searchTerm?: string;
}): Promise<TeamTopPerformers[]> {
  const baseUrl = `api/team/topPerformers`;

  const params = new URLSearchParams();

  if (options?.searchTerm) params.append('searchTerm', options.searchTerm);

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return Axios.get(url).then((response) => response.data);
}

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
