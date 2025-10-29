import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { usePlayerInfo } from '@/features/player/hooks/playerInfo/usePlayerInfo';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { Axios } from '@/app/Axios';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('@/app/Axios', () => ({
  Axios: { get: jest.fn() },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  Wrapper.displayName = 'QueryClientWrapper';

  return Wrapper;
}

describe('PlayerApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Gets Player info and returns data', async () => {
    const expectedName = 'JalenHurts';

    (useParams as jest.Mock).mockReturnValue({ playerName: expectedName });

    (Axios.get as jest.Mock).mockResolvedValue({
      data: {
        id: 1,
        name: expectedName,
      },
    });

    const { result } = renderHook(() => usePlayerInfo(), {
      wrapper: createWrapper(),
    });

    expect(Axios.get).toHaveBeenCalled();

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true);
      },
      { timeout: 2000 },
    );

    expect(result.current.data).toEqual({ id: 1, name: expectedName });
    expect(Axios.get).toHaveBeenCalledWith(`api/player/${expectedName}/info`);
  });

  it('Throws when no playerName provided', () => {
    (useParams as jest.Mock).mockReturnValue({});

    expect(() =>
      renderHook(() => usePlayerInfo(), { wrapper: createWrapper() }),
    ).toThrow();
  });
});
