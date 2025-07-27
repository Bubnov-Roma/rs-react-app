import { render, screen } from '@testing-library/react';
import { CardList } from '../pages/main/ui/components/card-list';
import { MemoryRouter } from 'react-router-dom';
import type { PokemonList } from '@/shared';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="mock-outlet">Mock Outlet</div>,
}));

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

  it('renders correct number of links for current page', () => {
    render(
      <MemoryRouter>
        <CardList {...defaultProps} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveTextContent('PIKACHU');
    expect(links[1]).toHaveTextContent('BULBASAUR');
    expect(links[2]).toHaveTextContent('CHARMANDER');
  });

  it('generates correct link paths', () => {
    render(
      <MemoryRouter>
        <CardList {...defaultProps} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links[0].getAttribute('href')).toBe('/page/1/pikachu');
    expect(links[1].getAttribute('href')).toBe('/page/1/bulbasaur');
    expect(links[2].getAttribute('href')).toBe('/page/1/charmander');
  });

  it('renders Outlet', () => {
    render(
      <MemoryRouter>
        <CardList {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });

  it('shows items for page 2 correctly', () => {
    render(
      <MemoryRouter>
        <CardList data={mockData} currentPage={2} itemsPerPage={3} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('SQUIRTLE');
    expect(links[1]).toHaveTextContent('MEWTWO');
  });
});
