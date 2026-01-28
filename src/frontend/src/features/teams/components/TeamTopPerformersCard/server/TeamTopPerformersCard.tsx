import 'server-only';

import TeamTopPerformersCardView from '../client/TeamTopPerformersCard';
import { teamTopPerformersQuery } from '@/features/teams/api/teamTopPerformers';
import { getQueryClient } from '@/components/ReactQueryProvider/ReactQueryProvider';
import { Skeleton } from '@mui/material';
import {
  getTopPerformersForStatCategory,
  StatCategories,
} from '@/features/player/utils/StatUtils';
import { playerInfoQuery } from '@/features/player/api/playerInfo';
import { PlayerCategoryStats } from '@/features/player/Types';

export default async function TeamTopPerformersCard({
  teamName,
}: {
  teamName: string;
}) {
  const queryClient = getQueryClient();
  const topPerformers = await queryClient.fetchQuery(
    teamTopPerformersQuery({ searchTerm: teamName }),
  );

  if (!topPerformers) return <div>Failed to query team top performers</div>;

  const teamTopPerformers = topPerformers.find(
    (t) => t.name.toLowerCase() === teamName.toLowerCase(),
  );

  if (!teamTopPerformers) {
    return <div>No top performers found for team: {teamName}</div>;
  }

  let topPerformersStats: PlayerCategoryStats[] = [];

  const statsPromises = Object.entries(StatCategories).map(
    async ([categoryName, config]) => {
      const topStats = getTopPerformersForStatCategory(
        [teamTopPerformers],
        config,
      );

      const playerIDs = [...new Set(topStats.map((stat) => stat.playerID))];

      const players = await queryClient.fetchQuery(
        playerInfoQuery({ ids: playerIDs }),
      );

      return {
        categoryName: categoryName,
        players: players || [],
        stats: topStats,
      };
    },
  );

  topPerformersStats = await Promise.all(statsPromises);

  return <TeamTopPerformersCardView topPerformers={topPerformersStats} />;
}

export function TeamTopPerformersCardSkeleton() {
  return <Skeleton variant="rectangular" height={400} />;
}
