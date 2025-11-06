'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Axios } from '@/app/Axios';
import { TeamInfo } from '@/features/teams/Types';

export function useTeamSearch(options: {
  searchTerm?: string;
  sortby?: string;
}): UseQueryResult<TeamInfo[]> {
  let url = 'api/team/search';
  let firstParamAdded = false;

  //TODO: Refactor to use URLSearchParams
  if (options.searchTerm || options.sortby) {
    url += '?';
  }

  if (options.searchTerm) {
    if (firstParamAdded) {
      url += '&';
    } else {
      firstParamAdded = true;
    }

    url += `searchTerm=${options.searchTerm}`;
  }

  if (options.sortby) {
    if (firstParamAdded) {
      url += '&';
    } else {
      firstParamAdded = true;
    }
    url += `sortBy=${options.sortby}`;
  }

  return useQuery({
    queryFn: () => Axios.get(url).then((response) => response.data),
    queryKey: ['useTeamSearch', options.searchTerm, options.sortby],
    staleTime: 1000 * 60 * 10,
  });
}
