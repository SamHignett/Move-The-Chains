import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TeamInfoCard from '@/features/teams/components/TeamInfoCard/TeamInfoCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { teamInfoQuery } from '@/features/teams/api/teamInfo';

describe('TeamInfoCard', () => {
  const mockName = 'Mock Team';
  const mockInfo = {
    city: 'Mock City',
    conference: 'Mock Conference',
    division: 'Mock Division',
    logoURL: 'https://via.placeholder.com/150',
    losses: 5,
    name: 'Mock Team',
    ties: 2,
    wins: 10,
  };

  it('Renders team information correctly', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 1000 * 60 * 5,
        },
      },
    });

    queryClient.setQueryData(teamInfoQuery(mockName).queryKey, mockInfo);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { getByAltText, getByText } = render(
      <TeamInfoCard teamName={mockName} />,
      { wrapper },
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();

    expect(getByAltText('Logo')).toHaveAttribute('src', mockInfo.logoURL);
    expect(getByText(mockInfo.name)).toBeInTheDocument();
    expect(getByText(`Location: ${mockInfo.city}`)).toBeInTheDocument();
    expect(
      getByText(
        `Division/Conference: ${mockInfo.conference} ${mockInfo.division}`,
      ),
    ).toBeInTheDocument();
    expect(
      getByText(
        `Current Season Record: ${mockInfo.wins}-${mockInfo.losses}-${mockInfo.ties}`,
      ),
    ).toBeInTheDocument();
  });
});
