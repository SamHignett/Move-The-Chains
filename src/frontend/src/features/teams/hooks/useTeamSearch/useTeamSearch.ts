'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamInfo } from '@/features/teams/Types';
import { teamSearchQuery } from '@/features/teams/api/teamSearch';

export function useTeamSearch(options?: {
  searchTerm?: string;
  sortBy?: string;
}): UseQueryResult<TeamInfo[]> {
  return useQuery(teamSearchQuery(options));
}
