import { TeamInfo } from '@/features/teams/Types';
import { Axios } from '@/app/Axios';

export function teamSearchQuery(options?: {
  searchTerm?: string;
  sortBy?: string;
}) {
  return {
    queryFn: () => fetchTeamSearch(options),
    queryKey: ['teamSearch', options?.searchTerm ?? '', options?.sortBy ?? ''],
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

  return Axios.get(url).then((response) => response.data);
}
