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
  pointsFor: number;
  pointsAgainst: number;
  offensive: TeamOffensiveStats;
  defensive: TeamDefensiveStats;
};

export type TeamOffensiveStats = {
  rushing: TeamRushingStats;
  passing: TeamPassingStats;
  kicking: TeamKickingStats;
  punting: TeamPuntingStats;
  fumbles: number;
  fumblesLost: number;
};

export type TeamRushingStats = {
  yards: number;
  touchdowns: number;
  carries: number;
};

export type TeamPassingStats = {
  attempts: number;
  yards: number;
  touchdowns: number;
  interceptions: number;
  completions: number;
};

export type TeamKickingStats = {
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  extraPointsMade: number;
  extraPointsAttempted: number;
};

export type TeamPuntingStats = {
  punts: number;
  yards: number;
  averageYards: number;
  puntsInside20: number;
};

export type TeamDefensiveStats = {
  fumblesRecovered: number;
  sacks: number;
  qbHits: number;
  interceptions: number;
  passingYardsAllowed: number;
  passingTDsAllowed: number;
  rushingYardsAllowed: number;
  rushingTDsAllowed: number;
};
