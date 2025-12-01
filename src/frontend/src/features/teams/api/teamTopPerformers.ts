import { TeamTopPerformers } from '@/features/teams/Types';
import { Fetch } from '@/app/Fetch';

export function teamTopPerformersQuery(options?: { searchTerm?: string }) {
  return {
    queryFn: () => fetchTeamTopPerformers(options),
    queryKey: ['teamTopPerformers', options?.searchTerm ?? ''],
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  };
}

export async function fetchTeamTopPerformers(options?: {
  searchTerm?: string;
}): Promise<TeamTopPerformers[]> {
  const baseUrl = `api/team/topPerformers`;

  const params = new URLSearchParams();

  if (options?.searchTerm) params.append('searchTerm', options.searchTerm);

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return Fetch(url);
}
