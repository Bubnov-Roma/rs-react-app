import { renderWithProviders } from '../utils/test-utils';
import { CardList } from '@/pages/main/ui/components/card-list';
import { screen } from '@testing-library/react';

const mockData = [
  { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur' },
];

describe('CardList', () => {
  it('renders links for current page', () => {
    renderWithProviders(
      <CardList data={mockData} currentPage={1} itemsPerPage={2} />
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });
});
