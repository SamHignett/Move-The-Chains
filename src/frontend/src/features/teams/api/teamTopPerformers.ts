import { TeamTopPerformers } from '@/features/teams/Types';
import { Axios } from '@/app/Axios';

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
