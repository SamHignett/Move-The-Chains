import { useQuery } from '@tanstack/react-query';
import { usePlayerInfo } from '@/features/player/hooks/usePlayerInfo/usePlayerInfo';
import { playerInfoQuery } from '@/features/player/api/playerInfo';

jest.mock('@tanstack/react-query');
jest.mock('@/features/player/api/playerInfo');

describe('PlayerApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Invokes useQuery with correct query & options', () => {
    const testOptions = {
      names: ['JalenHurts'],
    };

    const mockQueryConfig = { queryFn: jest.fn(), queryKey: ['JalenHurts'] };
    (playerInfoQuery as jest.Mock).mockReturnValue(mockQueryConfig);
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    usePlayerInfo(testOptions);

    expect(playerInfoQuery).toHaveBeenCalledWith(testOptions);
    expect(useQuery).toHaveBeenCalledWith(mockQueryConfig);
  });
});
