import { NavBar } from '@/app/components/navigation/NavBar';
import { TeamStatsPage } from '@/app/pages/TeamStatsPage';
import { QueryProvider } from '@/app/components/QueryProvider';

export default function Home() {
  return (
    <QueryProvider>
      <NavBar />
      <TeamStatsPage teamName={'Eagles'} />
    </QueryProvider>
  );
}
