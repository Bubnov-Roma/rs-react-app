import { screen } from '@testing-library/react';
import { PaginatedList } from '@/pages';
import { renderWithProviders } from '@/utils';

describe('PaginatedList content', () => {
  it('renders loading when pageContext is null', () => {
    const pageContextValue = {
      pageContext: null,
      numberPage: 1,
      setNumberPage: jest.fn(),
    };
    renderWithProviders(<PaginatedList />, { pageContextValue });
    expect(screen.getByTestId('spinner-container')).toBeInTheDocument();
  });

  it('shows message when pageContext empty', () => {
    const pageContextValue = {
      pageContext: [],
      numberPage: 1,
      setNumberPage: jest.fn(),
    };
    renderWithProviders(<PaginatedList />, { pageContextValue });
    expect(screen.getByText(/Oops.../i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing was found/i)).toBeInTheDocument();
  });

  it('renders CardList and SelectionPanel when pageContext has data', () => {
    const pageContextValue = {
      pageContext: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
      numberPage: 1,
      setNumberPage: jest.fn(),
    };
    renderWithProviders(<PaginatedList />, { pageContextValue });
    expect(screen.getByText(/BULBASAUR/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Unselect/ })
    ).toBeInTheDocument();
  });
});
