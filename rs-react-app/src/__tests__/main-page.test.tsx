import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from '../pages/main/ui';

jest.mock('../pages/main/api/api-client.ts', () => ({
  getListOfPokemon: jest.fn(),
  getOnePokemon: jest.fn(),
}));

jest.mock('@/shared', () => ({
  getStorage: jest.fn(),
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-boundary">{children}</div>
  ),
  ErrorComponent: ({ message }: { message: string }) => (
    <div data-testid="error">{message}</div>
  ),
}));

import { getStorage } from '@/shared';

import { getOnePokemon } from '../pages/main/api/api-client.ts';

describe('Main page component test', () => {
  const mockGetOnePokemon = getOnePokemon as jest.Mock;
  const mockGetStorage = getStorage as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('when mounted, calls handleSearch with the stored value', async () => {
    mockGetStorage.mockReturnValue('pikachu');

    mockGetOnePokemon.mockResolvedValue({ name: 'pikachu', id: 25 });

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(mockGetOnePokemon).toHaveBeenCalledWith('pikachu');
  });
});
