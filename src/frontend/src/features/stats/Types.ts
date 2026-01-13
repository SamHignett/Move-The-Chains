export type Stat = {
  value: number;
  id: string;
};

export type OffensiveStats = {
  rushing: RushingStats;
  receiving: ReceivingStats;
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
  defensiveTouchdowns: Stat;
  fumblesRecovered: Stat;
  soloTackles: Stat;
  qbHits: Stat;
  interceptions: Stat;
  passingYardsAllowed: Stat;
  passingTDsAllowed: Stat;
  rushingYardsAllowed: Stat;
  rushingTDsAllowed: Stat;
  passesDeflected: Stat;
  tacklesForLoss: Stat;
  totalTackles: Stat;
  sacks: Stat;
};

export type PlayerDefensiveStats = {
  defensiveTouchdowns: Stat;
  fumblesRecovered: Stat;
  soloTackles: Stat;
  qbHits: Stat;
  interceptions: Stat;
  passesDeflected: Stat;
  tackles: Stat;
  tacklesForLoss: Stat;
  sacks: Stat;
};

export type FumblingStats = {
  fumbles: Stat;
  fumblesLost: Stat;
  fumblesRecovered: Stat;
};

export type ReceivingStats = {
  targets: Stat;
  receptions: Stat;
  yards: Stat;
  touchdowns: Stat;
};
