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
import { PlayerInfo, PlayerSingleStat } from '@/features/player/Types';
import { useMemo } from 'react';
import Link from 'next/link';

export type PlayerStatTableProps = {
  category: string;
  stats: PlayerSingleStat[];
  players: PlayerInfo[];
};

export default function PlayerSingleStatTable({
  category,
  players,
  stats,
}: PlayerStatTableProps) {
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
