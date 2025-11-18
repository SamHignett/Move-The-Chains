'use client';

import React from 'react';
import { TeamInfoCard } from '@/app/stats/components/team/TeamInfoCard';
import { useTeamInfo } from '@/api/teams/TeamApi';

export type TeamStatsPageProps = {
  teamName: string;
};

const TeamStatsPage: React.FC<TeamStatsPageProps> = ({ teamName }) => {
  const { data: teamInfo, error, isLoading } = useTeamInfo(teamName);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !teamInfo) {
    return <div>No team information available.</div>;
  }

  return <TeamInfoCard info={teamInfo} />;
};

export { TeamStatsPage };
