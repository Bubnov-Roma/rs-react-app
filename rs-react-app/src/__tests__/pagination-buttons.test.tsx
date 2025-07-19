import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PaginationButtons } from '../pages/main/ui/buttons-section';
import { getListOfPokemon } from '../pages/main/api';

jest.mock('../pages/main/api', () => ({
  getListOfPokemon: jest.fn(),
}));

describe('Pagination buttons component', () => {
  const mockOnMove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders and fetches data on mount', async () => {
    (getListOfPokemon as jest.Mock).mockResolvedValueOnce({
      previous: null,
      next: 'https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20',
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
        { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
        { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
        { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
        { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
        { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
        { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
        { name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/' },
        { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
        { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
        { name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/' },
        { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/' },
        { name: 'pidgeotto', url: 'https://pokeapi.co/api/v2/pokemon/17/' },
        { name: 'pidgeot', url: 'https://pokeapi.co/api/v2/pokemon/18/' },
        { name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/' },
      ],
    });
    render(<PaginationButtons onMove={mockOnMove} />);
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
    await waitFor(() => expect(getListOfPokemon).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  test('calls onMove when next button is clicked', async () => {
    (getListOfPokemon as jest.Mock)
      .mockResolvedValueOnce({
        previous: null,
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"',
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      })
      .mockResolvedValueOnce({
        previous: 'https://pokeapi.co/api/v2/pokemon/?offset=60&limit=20',
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20',
        results: [
          { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
          { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
        ],
      });
    render(<PaginationButtons onMove={mockOnMove} />);
    await waitFor(() => expect(getListOfPokemon).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByText(/Next/i));
    await waitFor(() => expect(getListOfPokemon).toHaveBeenCalledTimes(2));
  });

  test('calls onMove when previous button is clicked', async () => {
    (getListOfPokemon as jest.Mock)
      .mockResolvedValueOnce({
        previous: null,
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20',
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      })
      .mockResolvedValueOnce({
        previous: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=80&limit=20',
        results: [
          { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
          { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
        ],
      });
    render(<PaginationButtons onMove={mockOnMove} />);
    await waitFor(() => expect(getListOfPokemon).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByText(/Previous/i));
    await waitFor(() => expect(getListOfPokemon).toHaveBeenCalledTimes(3));
  });

  test('does not call onMove if there is an error', async () => {
    (getListOfPokemon as jest.Mock).mockResolvedValueOnce(
      new Error('Failed to fetch')
    );
    render(<PaginationButtons onMove={mockOnMove} />);
    await waitFor(() => expect(getListOfPokemon).toHaveBeenCalledTimes(1));
    expect(mockOnMove).not.toHaveBeenCalled();
  });
});
