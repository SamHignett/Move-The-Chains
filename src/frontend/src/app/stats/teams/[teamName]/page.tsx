'use client';

import React from 'react';
import { useTeamInfo } from '@/api/teams/TeamApi';
import TeamInfoCard from '@/app/stats/components/team/TeamInfoCard';

export default function TeamStatsPage() {
  const { data: teamInfo, isLoading, error } = useTeamInfo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !teamInfo) {
    return <div>No team information available.</div>;
  }

  return <TeamInfoCard info={teamInfo} />;
}
