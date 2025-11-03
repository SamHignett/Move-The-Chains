'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Axios } from '@/app/Axios';

export type PlayerInfo = {
  id: string;
  name: string;
  age: number;
  height: string;
  weight: number;
  school: string;
  currentTeam: string;
  position: string;
  headshotImageUrl: string;
};

export function usePlayerInfo(): UseQueryResult<PlayerInfo> {
  const { playerName } = useParams<{ playerName: string }>();

  if (!playerName)
    throw new Error('Player name is required to fetch player information.');

  return useQuery({
    queryKey: ['playerInfo', playerName],
    queryFn: () =>
      Axios.get(`api/player/${playerName}/info`).then(
        (response) => response.data,
      ),
    staleTime: 1000 * 60 * 5,
  });
}
