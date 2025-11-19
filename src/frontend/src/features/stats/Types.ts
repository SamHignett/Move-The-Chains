export type Stat = {
  value: number;
  id: string;
};

export type OffensiveStats = {
  rushing: RushingStats;
  passing: PassingStats;
  kicking: KickingStats;
  punting: PuntingStats;
  fumbling: FumblingStats;
};

export type RushingStats = {
  yards: Stat;
  touchdowns: Stat;
  carries: Stat;
};

export type PassingStats = {
  attempts: Stat;
  yards: Stat;
  touchdowns: Stat;
  interceptions: Stat;
  completions: Stat;
};

export type KickingStats = {
  fieldGoalsMade: Stat;
  fieldGoalsAttempted: Stat;
  extraPointsMade: Stat;
  extraPointsAttempted: Stat;
};

export type PuntingStats = {
  punts: Stat;
  yards: Stat;
  averageYards: Stat;
  puntsInside20: Stat;
};

export type TeamDefensiveStats = {
  fumblesRecovered: Stat;
  sacks: Stat;
  qbHits: Stat;
  interceptions: Stat;
  passingYardsAllowed: Stat;
  passingTDsAllowed: Stat;
  rushingYardsAllowed: Stat;
  rushingTDsAllowed: Stat;
};

export type PlayerDefensiveStats = {
  fumblesRecovered: Stat;
  sacks: Stat;
  qbHits: Stat;
  interceptions: Stat;
  tackles: Stat;
  soloTackles: Stat;
  tacklesForLoss: Stat;
  passesDeflected: Stat;
  defensiveTouchdowns: Stat;
};

export type FumblingStats = {
  fumbles: Stat;
  fumblesLost: Stat;
  fumblesRecovered: Stat;
};
