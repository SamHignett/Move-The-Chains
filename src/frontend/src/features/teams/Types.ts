import {
  OffensiveStats,
  RushingStats,
  PassingStats,
  KickingStats,
  PuntingStats,
  PlayerDefensiveStats,
  TeamDefensiveStats,
  ReceivingStats,
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
  receiving: ReceivingStats;
  defensive: PlayerDefensiveStats;
};

export type TeamSingleStat = {
  teamName: string;
  logoURL?: string;
  name: string;
  value: number;
};

export type Game = {
  id: string;
  type: string;
  homeTeamID: number;
  homeTeamName: string;
  awayTeamID: number;
  awayTeamName: string;
  date: Date;
  time: string;
  gameWeek: string;
  status: string;
  winner?: string;
  homePoints: number;
  awayPoints: number;
};

export type TeamSchedule = {
  games: Game[];
};
