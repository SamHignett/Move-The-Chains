'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TeamTopPerformers } from '@/features/teams/Types';
import { teamTopPerformersQuery } from '@/features/teams/api/teamTopPerformers';

export function useTeamTopPerformers(options?: {
  searchTerm?: string;
}): UseQueryResult<TeamTopPerformers[]> {
  return useQuery(teamTopPerformersQuery(options));
}
