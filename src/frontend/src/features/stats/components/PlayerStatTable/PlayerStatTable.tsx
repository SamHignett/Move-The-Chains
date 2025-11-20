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
import { formatCamelCase } from '@/utils/string/StringUtils';
import { PlayerSingleStat } from '@/features/player/Types';
import { usePlayerInfo } from '@/features/player/hooks/usePlayerInfo/usePlayerInfo';
import { useMemo } from 'react';

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

  const { data: players } = usePlayerInfo({ ids: playerIDs });

  const playerNameById = useMemo(() => {
    if (!players) return new Map<string, string>();

    return new Map(players.map((p) => [p.id, p.name]));
  }, [players]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              {category}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat) => (
            <TableRow key={stat.name}>
              <TableCell align="left" scope="row">
                {formatCamelCase(stat.name)}
              </TableCell>
              <TableCell align="center" scope="row">
                {playerNameById.get(stat.playerID)}
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
