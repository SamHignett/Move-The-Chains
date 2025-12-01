'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamInfo } from '@/features/teams/Types';
import { teamInfoQuery } from '@/features/teams/api/teamInfo';

export function useTeamInfo(teamName: string): UseQueryResult<TeamInfo> {
  return useQuery(teamInfoQuery(teamName));
}
