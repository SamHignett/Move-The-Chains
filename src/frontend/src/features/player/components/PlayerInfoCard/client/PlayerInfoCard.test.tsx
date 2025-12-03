import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PlayerInfoCard from '@/features/player/components/PlayerInfoCard/client/PlayerInfoCard';

describe('PlayerInfoCard', () => {
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

  it('Renders player information correctly', () => {
    const { getByAltText, getByText } = render(
      <PlayerInfoCard info={mockPlayer} />,
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
