'use client';

import { Axios } from '@/app/Axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamInfo } from '@/features/teams/Types';

export function useTeamInfo(teamName?: string): UseQueryResult<TeamInfo> {
  if (!teamName)
    throw new Error('Team name is required to fetch team information.');

  const baseUrl = 'api/team/info';

  const params = new URLSearchParams();
  params.append('name', teamName);

  const url = `${baseUrl}?${params.toString()}`;

  return useQuery({
    queryFn: () => Axios.get(url).then((response) => response.data),
    queryKey: ['teamInfo', teamName],
    staleTime: 1000 * 60 * 5,
  });
}
