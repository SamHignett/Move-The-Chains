import {
  OffensiveStats,
  RushingStats,
  PassingStats,
  KickingStats,
  PuntingStats,
  PlayerDefensiveStats,
  TeamDefensiveStats,
} from '@/features/stats/Types';

export type TeamInfo = {
  id: string;
  name: string;
  logoURL: string;
  city: string;
  conference: string;
  division: string;
  wins: number;
  losses: number;
  ties: number;
};

export type TeamStats = {
  name: string;
  logoURL: string;
  pointsFor: number;
  pointsAgainst: number;
  offensive: OffensiveStats;
  defensive: TeamDefensiveStats;
};

export type TeamTopPerformers = {
  rushing: RushingStats;
  passing: PassingStats;
  kicking: KickingStats;
  punting: PuntingStats;
  defensive: PlayerDefensiveStats;
};

export type TeamSingleStat = {
  teamName: string;
  logoURL?: string;
  name: string;
  value: number;
};
