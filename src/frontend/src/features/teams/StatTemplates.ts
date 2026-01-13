import {
  RushingStats,
  PassingStats,
  KickingStats,
  PuntingStats,
  TeamDefensiveStats,
  PlayerDefensiveStats,
  FumblingStats,
  ReceivingStats,
} from '@/features/stats/Types';

export const RushingStatsTemplate: RushingStats = {
  carries: { id: '', value: 0 },
  touchdowns: { id: '', value: 0 },
  yards: { id: '', value: 0 },
};

export const PassingStatsTemplate: PassingStats = {
  attempts: { id: '', value: 0 },
  completions: { id: '', value: 0 },
  interceptions: { id: '', value: 0 },
  touchdowns: { id: '', value: 0 },
  yards: { id: '', value: 0 },
};

export const KickingStatsTemplate: KickingStats = {
  extraPointsAttempted: { id: '', value: 0 },
  extraPointsMade: { id: '', value: 0 },
  fieldGoalsAttempted: { id: '', value: 0 },
  fieldGoalsMade: { id: '', value: 0 },
};

export const PuntingStatsTemplate: PuntingStats = {
  averageYards: { id: '', value: 0 },
  punts: { id: '', value: 0 },
  puntsInside20: { id: '', value: 0 },
  yards: { id: '', value: 0 },
};

export const TeamDefensiveStatsTemplate: TeamDefensiveStats = {
  defensiveTouchdowns: { id: '', value: 0 },
  fumblesRecovered: { id: '', value: 0 },
  interceptions: { id: '', value: 0 },
  passesDeflected: { id: '', value: 0 },
  passingTDsAllowed: { id: '', value: 0 },
  passingYardsAllowed: { id: '', value: 0 },
  qbHits: { id: '', value: 0 },
  rushingTDsAllowed: { id: '', value: 0 },
  rushingYardsAllowed: { id: '', value: 0 },
  sacks: { id: '', value: 0 },
  soloTackles: { id: '', value: 0 },
  tacklesForLoss: { id: '', value: 0 },
  totalTackles: { id: '', value: 0 },
};

export const PlayerDefensiveStatsTemplate: PlayerDefensiveStats = {
  defensiveTouchdowns: { id: '', value: 0 },
  fumblesRecovered: { id: '', value: 0 },
  interceptions: { id: '', value: 0 },
  passesDeflected: { id: '', value: 0 },
  qbHits: { id: '', value: 0 },
  sacks: { id: '', value: 0 },
  soloTackles: { id: '', value: 0 },
  tackles: { id: '', value: 0 },
  tacklesForLoss: { id: '', value: 0 },
};

export const FumblingStatsTemplate: FumblingStats = {
  fumbles: { id: '', value: 0 },
  fumblesLost: { id: '', value: 0 },
  fumblesRecovered: { id: '', value: 0 },
};

export const ReceivingStatsTemplate: ReceivingStats = {
  receptions: { id: '', value: 0 },
  targets: { id: '', value: 0 },
  touchdowns: { id: '', value: 0 },
  yards: { id: '', value: 0 },
};
