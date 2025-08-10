import { screen, fireEvent } from '@testing-library/react';
import { Card } from '@/pages/main/ui/components/card';
import { renderWithProviders } from '@/utils';
import React from 'react';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('@/pages/main/ui/components/refresh-pokemon-button.tsx', () => ({
  RefreshPokemonButton: () => <button>Mock Refresh Button</button>,
}));

describe('Card', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  const fakePokemon = {
    name: 'pikachu',
    sprites: {
      front_default: 'https://example.com/pikachu.png',
    },
    types: [{ type: { name: 'electric' } }],
    height: '4',
    weight: '60',
    game_indices: [1, 2, 3],
  };

  it('renders pokemon data correctly', () => {
    renderWithProviders(<Card {...fakePokemon} />);

    expect(screen.getByAltText(/pikachu sprite/i)).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
    expect(screen.getByText(/60/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByText(/Mock Refresh Button/)).toBeInTheDocument();
  });

  it('calls navigate with correct page when close button clicked', () => {
    renderWithProviders(<Card {...fakePokemon} />, {
      pageContextValue: {
        numberPage: 5,
        setNumberPage: jest.fn(),
      },
    });

    const closeButton = screen.getByRole('button', { name: /close card/i });
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/page/5');
  });

  it('uses setNumberPage if numberPage is null', () => {
    const setNumberPage = jest.fn();

    renderWithProviders(<Card {...fakePokemon} />, {
      pageContextValue: {
        numberPage: null,
        setNumberPage,
      },
    });

    const closeButton = screen.getByRole('button', { name: /close card/i });
    fireEvent.click(closeButton);

    expect(setNumberPage).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });
});
