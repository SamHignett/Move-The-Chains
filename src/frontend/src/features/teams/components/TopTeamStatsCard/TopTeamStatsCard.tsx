'use client';

import { useTeamStats } from '@/features/teams/hooks/useTeamStats/useTeamStats';
import React from 'react';

export default function TopTeamStatsCard() {
  const { data: teamStats = [] } = useTeamStats();

  console.log(teamStats);

  return <div>TopTeamStatsCard</div>;
}
