'use client';

import { Stat } from '@/features/stats/Types';
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

export type StatTableProps = {
  category: string;
  stats: Stat[];
};

export default function StatTable({ category, stats }: StatTableProps) {
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
            <TableRow key={stat.id}>
              <TableCell align="left" scope="row">
                {formatCamelCase(stat.id)}
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
