'use client';

import { Axios } from '@/app/Axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export type TeamInfo = {
  id: string;
  name: string;
  logoURL: string;
  city: string;
  conference: string;
  division: string;
  wins: number;
  losses: number;
  ties: number;
};

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
