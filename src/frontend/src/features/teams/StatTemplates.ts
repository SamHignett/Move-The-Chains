import {
  TeamRushingStats,
  TeamPassingStats,
  TeamKickingStats,
  TeamPuntingStats,
  TeamDefensiveStats,
  TeamFumblingStats,
} from '@/features/teams/Types';

export const RushingStatsTemplate: TeamRushingStats = {
  carries: 0,
  touchdowns: 0,
  yards: 0,
};

export const PassingStatsTemplate: TeamPassingStats = {
  attempts: 0,
  completions: 0,
  interceptions: 0,
  touchdowns: 0,
  yards: 0,
};

export const KickingStatsTemplate: TeamKickingStats = {
  extraPointsAttempted: 0,
  extraPointsMade: 0,
  fieldGoalsAttempted: 0,
  fieldGoalsMade: 0,
};

export const PuntingStatsTemplate: TeamPuntingStats = {
  averageYards: 0,
  punts: 0,
  puntsInside20: 0,
  yards: 0,
};

export const DefensiveStatsTemplate: TeamDefensiveStats = {
  fumblesRecovered: 0,
  interceptions: 0,
  passingTDsAllowed: 0,
  passingYardsAllowed: 0,
  qbHits: 0,
  rushingTDsAllowed: 0,
  rushingYardsAllowed: 0,
  sacks: 0,
};

export const FumblingStatsTemplate: TeamFumblingStats = {
  fumbles: 0,
  fumblesLost: 0,
  fumblesRecovered: 0,
};
