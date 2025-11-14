'use client';

import React from 'react';
import { useTeamInfo } from '@/features/teams/hooks/useTeamInfo/useTeamInfo';
import TeamInfoCard from '@/features/teams/components/TeamInfoCard/TeamInfoCard';
import { useParams } from 'next/navigation';

export default function TeamStatsPage() {
  const { teamName } = useParams<{ teamName: string }>();
  const { data: teamInfo, error, isLoading } = useTeamInfo(teamName);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !teamInfo) {
    return <div>No team information available.</div>;
  }

  return <TeamInfoCard info={teamInfo} />;
}
