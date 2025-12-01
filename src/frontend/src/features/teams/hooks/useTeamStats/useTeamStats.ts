'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamStats } from '@/features/teams/Types';
import { teamStatsQuery } from '@/features/teams/api/teamStats';

export function useTeamStats(options?: {
  searchTerm?: string;
}): UseQueryResult<TeamStats[]> {
  return useQuery(teamStatsQuery(options));
}
