import { TeamInfo } from '@/features/teams/Types';
import { Fetch } from '@/app/Fetch';

export function teamSearchQuery(options?: {
  searchTerm?: string;
  sortBy?: string;
}) {
  return {
    queryFn: () => fetchTeamSearch(options),
    queryKey: ['teamSearch', options?.searchTerm ?? '', options?.sortBy ?? ''],
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
  };
}

export async function fetchTeamSearch(options?: {
  searchTerm?: string;
  sortBy?: string;
}): Promise<TeamInfo[]> {
  const baseUrl = 'api/team/search';

  const params = new URLSearchParams();

  if (options?.searchTerm) {
    params.append('searchTerm', options.searchTerm);
  }

  if (options?.sortBy) {
    params.append('sortBy', options.sortBy);
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  return Fetch(url);
}
