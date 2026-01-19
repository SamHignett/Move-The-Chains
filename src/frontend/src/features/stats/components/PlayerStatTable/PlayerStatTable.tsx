'use client';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { formatCamelCase, removeSpaces } from '@/utils/string/StringUtils';
import { PlayerSingleStat } from '@/features/player/Types';
import { useMemo } from 'react';
import { playerInfoQuery } from '@/features/player/api/playerInfo';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export type PlayerStatTableProps = {
  category: string;
  stats: PlayerSingleStat[];
};

export default function PlayerStatTable({
  category,
  stats,
}: PlayerStatTableProps) {
  const playerIDs = useMemo(
    () => [...new Set(stats.map((stat) => stat.playerID))],
    [stats],
  );

  const { data: players } = useQuery(playerInfoQuery({ ids: playerIDs }));

  const playerNameById = useMemo(() => {
    if (!players) return new Map<string, string>();

    return new Map(players.map((p) => [p.id, p.name]));
  }, [players]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              {category}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat) => (
            <TableRow key={`${stat.name}-${stat.playerID}`}>
              <TableCell align="left" scope="row">
                {formatCamelCase(stat.name)}
              </TableCell>
              <TableCell align="center" scope="row">
                <Link
                  href={`/stats/player/${encodeURIComponent(removeSpaces(playerNameById.get(stat.playerID) || ''))}`}
                >
                  {playerNameById.get(stat.playerID)}
                </Link>
              </TableCell>
              <TableCell align="center" scope="row">
                {stat.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
