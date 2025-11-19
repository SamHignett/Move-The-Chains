import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PlayerInfoCard from '@/features/player/components/PlayerInfoCard/PlayerInfoCard';

describe('PlayerInfoCard', () => {
  const mockInfo = {
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
