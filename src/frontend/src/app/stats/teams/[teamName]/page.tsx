'use client';

import React from 'react';
import { useTeamInfo } from '@/features/teams/hooks/useTeamInfo/useTeamInfo';
import TeamInfoCard from '@/features/teams/components/TeamInfoCard/TeamInfoCard';
import { useParams } from 'next/navigation';
import TeamStatsCard from '@/features/teams/components/TeamStatsCard/TeamStatsCard';
import { useTeamStats } from '@/features/teams/hooks/useTeamStats/useTeamStats';
import { Stack } from '@mui/system';
import TeamTopPerformersCard from '@/features/teams/components/TeamTopPerformersCard/TeamTopPerformersCard';
import { useTeamTopPerformers } from '@/features/teams/hooks/useTeamTopPerformers/useTeamTopPerformers';

export default function TeamStatsPage() {
  const { teamName } = useParams<{ teamName: string }>();
  const { data: teamStats } = useTeamStats({ searchTerm: teamName });
  const { data: teamInfo, error, isLoading } = useTeamInfo(teamName);
  const { data: topPerformers } = useTeamTopPerformers({
    searchTerm: teamName,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !teamInfo) {
    return <div>No team information available.</div>;
  }

  if (
    teamStats === undefined ||
    teamStats.length === 0 ||
    teamStats.length > 1
  ) {
    return <div> Error accessing team stats.</div>;
  }

  if (
    topPerformers === undefined ||
    topPerformers.length === 0 ||
    topPerformers.length > 1
  ) {
    return <div> Error accessing team top performers.</div>;
  }

  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: 'center',
      }}
    >
      <TeamInfoCard info={teamInfo} />
      <TeamStatsCard stats={teamStats[0]} />
      <TeamTopPerformersCard teamTopPerformers={topPerformers[0]} />
    </Stack>
  );
}
