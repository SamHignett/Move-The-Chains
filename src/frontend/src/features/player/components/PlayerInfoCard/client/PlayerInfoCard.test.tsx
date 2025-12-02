import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PlayerInfoCard from '@/features/player/components/PlayerInfoCard/PlayerInfoCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { playerInfoQuery } from '@/features/player/api/playerInfo';

describe('PlayerInfoCard', () => {
  const mockName = 'Mock Player';
  const mockPlayer = {
    age: 25,
    currentTeam: 'Mock Team',
    headshotImageUrl: 'https://via.placeholder.com/100',
    height: '6 ft 2 in',
    id: '1',
    name: 'Mock Player',
    position: 'Mock Position',
    school: 'Mock University',
    weight: 210,
  };

  const mockInfo = [mockPlayer];

  it('Renders player information correctly', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 1000 * 60 * 5,
        },
      },
    });

    queryClient.setQueryData(
      playerInfoQuery({ names: [mockName] }).queryKey,
      mockInfo,
    );

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { getByAltText, getByText } = render(
      <PlayerInfoCard playerName={mockName} />,
      { wrapper },
    );

    expect(screen.getByAltText('Headshot')).toBeInTheDocument();
    expect(getByAltText('Headshot')).toHaveAttribute(
      'src',
      mockPlayer.headshotImageUrl,
    );

    expect(getByText(mockPlayer.name)).toBeInTheDocument();
    expect(getByText(`Height: ${mockPlayer.height}`)).toBeInTheDocument();
    expect(getByText(`Weight: ${mockPlayer.weight} lbs`)).toBeInTheDocument();
    expect(getByText(`Age: ${mockPlayer.age}`)).toBeInTheDocument();
    expect(getByText(`School: ${mockPlayer.school}`)).toBeInTheDocument();
    expect(
      getByText(`Current Team: ${mockPlayer.currentTeam}`),
    ).toBeInTheDocument();
    expect(getByText(`Position: ${mockPlayer.position}`)).toBeInTheDocument();
  });
});
