import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { usePlayerInfo } from '@/api/players/PlayerApi';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
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

  it('Fetches Player info and returns data', async () => {
    const expectedName = 'Jalen Hurts';

    (useParams as jest.Mock).mockReturnValue({ playerName: expectedName });

    (globalThis as unknown as { fetch?: typeof fetch }).fetch = jest
      .fn()
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ id: 1, name: expectedName }),
      });

    const { result } = renderHook(() => usePlayerInfo(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({ id: 1, name: expectedName });
    expect(
      (globalThis as unknown as { fetch?: typeof fetch }).fetch,
    ).toHaveBeenCalledWith(`api/player/${expectedName}/info`);
  });

  it('Throws when no playerName provided', () => {
    (useParams as jest.Mock).mockReturnValue({});

    expect(() =>
      renderHook(() => usePlayerInfo(), { wrapper: createWrapper() }),
    ).toThrow();
  });
});
