import { render, screen, fireEvent } from '@testing-library/react';
import { CardList } from '@/pages/main/ui/components/card-list';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PokemonList } from '@/shared';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="mock-outlet">Mock Outlet</div>,
}));

jest.mock('@/features', () => {
  const actual = jest.requireActual('@/features');
  return {
    ...actual,
    fetchPokemon: jest.fn(() => ({ type: 'pokemonSelection/fetchPokemon' })),
  };
});

import { fetchPokemon } from '@/features';

const mockStore = configureStore();

describe('CardList', () => {
  const mockData: PokemonList[] = [
    { name: 'pikachu', url: '/api/v2/pokemon/pikachu' },
    { name: 'bulbasaur', url: '/api/v2/pokemon/bulbasaur' },
    { name: 'charmander', url: '/api/v2/pokemon/charmander' },
    { name: 'squirtle', url: '/api/v2/pokemon/squirtle' },
    { name: 'mewtwo', url: '/api/v2/pokemon/mewtwo' },
  ];

  const defaultProps = {
    data: mockData,
    currentPage: 1,
    itemsPerPage: 3,
  };

  const createMockState = (selected = {}) => ({
    pokemonSelection: { selected },
  });

  const renderWithStore = (state = createMockState()) => {
    const store = mockStore(state);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList {...defaultProps} />
        </MemoryRouter>
      </Provider>
    );
    return store;
  };

  it('renders correct number of links for current page', () => {
    renderWithStore();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveTextContent('PIKACHU');
    expect(links[1]).toHaveTextContent('BULBASAUR');
    expect(links[2]).toHaveTextContent('CHARMANDER');
  });

  it('generates correct link paths', () => {
    renderWithStore();
    const links = screen.getAllByRole('link');
    expect(links[0].getAttribute('href')).toBe('/page/1/pikachu');
    expect(links[1].getAttribute('href')).toBe('/page/1/bulbasaur');
    expect(links[2].getAttribute('href')).toBe('/page/1/charmander');
  });

  it('renders Outlet', () => {
    renderWithStore();
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });

  it('shows items for page 2 correctly', () => {
    const store = mockStore(createMockState());
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList data={mockData} currentPage={2} itemsPerPage={3} />
        </MemoryRouter>
      </Provider>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('SQUIRTLE');
    expect(links[1]).toHaveTextContent('MEWTWO');
  });

  it('dispatches fetchPokemon when checkbox is checked', () => {
    renderWithStore();
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    expect(fetchPokemon).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'pikachu' })
    );
  });
});
