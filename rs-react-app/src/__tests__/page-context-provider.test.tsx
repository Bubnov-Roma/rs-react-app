import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { useGetAllPokemonQuery } from '@/features';

jest.mock('@/features', () => ({
  useGetAllPokemonQuery: jest.fn(),
}));

const mockedUseStorage = jest.fn();

jest.mock('@/shared', () => {
  const actual = jest.requireActual('@/shared');
  return {
    ...actual,
    useStorage: mockedUseStorage,
  };
});

import { PageContextProvider, PageContext } from '@/shared';

const mockPokemons = {
  results: [
    { name: 'bulbasaur' },
    { name: 'charmander' },
    { name: 'squirtle' },
  ],
};

const ConsumerComponent = () => {
  const context = React.useContext(PageContext);

  if (!context) return <div>No context</div>;

  return (
    <>
      <div>Loaded: {context.isLoaded ? 'true' : 'false'}</div>
      <div>Pokemons: {context.pageContext.map((p) => p.name).join(', ')}</div>
      <div>SearchValue: {context.storedSearchValue}</div>
      <div>NumberPage: {context.numberPage}</div>
    </>
  );
};

describe('PageContextProvider', () => {
  beforeEach(() => {
    (useGetAllPokemonQuery as jest.Mock).mockReturnValue({
      data: mockPokemons,
      refetch: jest.fn(),
      isFetching: false,
    });

    mockedUseStorage.mockImplementation((key: string, initialValue: string) => {
      switch (key) {
        case 'storageValue':
          return {
            storedValue: '',
            setStoredValue: jest.fn(),
          };
        case 'page':
          return {
            storedValue: 1,
            setStoredValue: jest.fn(),
          };
        default:
          return {
            storedValue: initialValue ?? null,
            setStoredValue: jest.fn(),
          };
      }
    });
  });

  it('should provide context values correctly', async () => {
    render(
      <PageContextProvider>
        <ConsumerComponent />
      </PageContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Loaded: false')).toBeInTheDocument();
      expect(
        screen.getByText('Pokemons: bulbasaur, charmander, squirtle')
      ).toBeInTheDocument();
      expect(screen.getByText('SearchValue:')).toBeInTheDocument();
      expect(screen.getByText('NumberPage: 1')).toBeInTheDocument();
    });
  });
});
