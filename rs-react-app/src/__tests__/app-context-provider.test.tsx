import React, { useContext } from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { AppContextProvider } from '../shared';
import { PageContext } from '../shared/context';
import { getAllPokemon } from '../pages/main/api';

jest.mock('../pages/main/api', () => ({
  getAllPokemon: jest.fn(),
}));

describe('AppContextProvider', () => {
  const mockResults = [
    { name: 'pikachu' },
    { name: 'bulbasaur' },
    { name: 'pikalord' },
  ];

  const TestComponent = () => {
    const context = useContext(PageContext);
    return (
      <div>
        <div>Loaded: {String(context.isLoaded)}</div>
        <div>
          Data:{' '}
          {context.pageContext?.map((item) => item.name).join(', ') || 'Empty'}
        </div>
      </div>
    );
  };

  beforeEach(() => {
    localStorage.setItem('storageValue', JSON.stringify('pika'));
    (getAllPokemon as jest.Mock).mockResolvedValue({ results: mockResults });
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('provides filtered context based on localStorage value', async () => {
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Loaded: false/i)).toBeInTheDocument()
    );

    expect(screen.getByText(/Data: pikachu, pikalord/i)).toBeInTheDocument();
  });

  it('provides full data when no localStorage value', async () => {
    localStorage.removeItem('storageValue');
    render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Loaded: false/i)).toBeInTheDocument()
    );
    expect(
      screen.getByText(/Data: pikachu, bulbasaur, pikalord/i)
    ).toBeInTheDocument();
  });
});
