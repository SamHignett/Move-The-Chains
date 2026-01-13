import { OffensiveStats, PlayerDefensiveStats } from '@/features/stats/Types';

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

export type PlayerStats = {
  id: string;
  name: string;
  offensive?: OffensiveStats;
  defensive?: PlayerDefensiveStats;
};

export type PlayerSingleStat = {
  name: string;
  value: number;
  playerID: string;
};
