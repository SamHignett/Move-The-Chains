import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PlayerInfoCard from '@/features/player/components/PlayerInfoCard/PlayerInfoCard';

describe('PlayerInfoCard', () => {
  const mockInfo = {
    id: '1',
    name: 'Mock Player',
    age: 25,
    height: '6 ft 2 in',
    weight: 210,
    school: 'Mock University',
    currentTeam: 'Mock Team',
    position: 'Mock Position',
    headshotImageUrl: 'https://via.placeholder.com/100',
  };

  it('Renders player information correctly', () => {
    const { getByText, getByAltText } = render(
      <PlayerInfoCard info={mockInfo} />,
    );

    expect(screen.getByAltText('Headshot')).toBeInTheDocument();
    expect(getByAltText('Headshot')).toHaveAttribute(
      'src',
      mockInfo.headshotImageUrl,
    );

    expect(getByText(mockInfo.name)).toBeInTheDocument();
    expect(getByText(`Height: ${mockInfo.height}`)).toBeInTheDocument();
    expect(getByText(`Weight: ${mockInfo.weight} lbs`)).toBeInTheDocument();
    expect(getByText(`Age: ${mockInfo.age}`)).toBeInTheDocument();
    expect(getByText(`School: ${mockInfo.school}`)).toBeInTheDocument();
    expect(
      getByText(`Current Team: ${mockInfo.currentTeam}`),
    ).toBeInTheDocument();
    expect(getByText(`Position: ${mockInfo.position}`)).toBeInTheDocument();
  });
});
