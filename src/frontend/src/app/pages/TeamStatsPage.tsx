'use client';

import React from 'react';
import { TeamInfoCard } from '@/app/stats/components/team/TeamInfoCard';
import { useTeamInfo } from '@/api/teams/TeamApi.tsx';

export type TeamStatsPageProps = {
  teamName: string;
};

const TeamStatsPage: React.FC<TeamStatsPageProps> = ({ teamName }) => {
  const { data: teamInfo, isLoading } = useTeamInfo(teamName);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(teamInfo);

  return <TeamInfoCard info={teamInfo as NonNullable<typeof teamInfo>} />;
};

export { TeamStatsPage };
