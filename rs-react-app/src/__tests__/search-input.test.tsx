import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RefreshAllSelectedButton } from '@/features/pokemon-selection/ui/refresh-all-selected-button';
import { useAppDispatch, useAppSelector, useSnackbar } from '@/shared/hooks';
import {
  useLazyGetPokemonByNameQuery,
  pokemonApi,
  addPokemon,
  setPokemonLoading,
  setPokemonError,
} from '@/features';
import { PokemonType } from '@/shared';

jest.mock('@/shared/hooks/use-app-dispatch', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('@/shared/hooks/use-app-selector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/shared/hooks/use-snackbar', () => ({
  useSnackbar: jest.fn(),
}));

jest.mock('@/features', () => ({
  __esModule: true,
  ...jest.requireActual('@/features'),
  useLazyGetPokemonByNameQuery: jest.fn(),
  addPokemon: jest.fn(),
  setPokemonLoading: jest.fn(),
  setPokemonError: jest.fn(),
  pokemonApi: {
    util: {
      invalidateTags: jest.fn(),
    },
  },
}));

const mockPokemon: PokemonType = {
  name: 'pikachu',
  height: '4',
  weight: '60',
  sprites: { front_default: 'pikachu.png' },
  types: [{ type: { name: 'electric' } }],
  game_indices: [],
};

describe('RefreshAllSelectedButton', () => {
  const mockDispatch = jest.fn();
  const mockShowSnackbar = jest.fn();
  const mockLoadPokemon = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSnackbar as jest.Mock).mockReturnValue({
      showSnackbar: mockShowSnackbar,
    });
    (useLazyGetPokemonByNameQuery as jest.Mock).mockReturnValue([
      mockLoadPokemon,
    ]);
  });

  it('should disable the button when no pokémon are selected', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({ pokemonSelection: { selected: {} } })
    );

    render(<RefreshAllSelectedButton />);
    const button = screen.getByRole('button', { name: /update/i });

    expect(button).toBeDisabled();
  });

  it('should handle successful refresh of all selected pokémon', async () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        pokemonSelection: {
          selected: {
            pikachu: { loading: false, data: mockPokemon },
          },
        },
      })
    );

    mockLoadPokemon.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue(mockPokemon),
    });

    (addPokemon as unknown as jest.Mock).mockReturnValue({
      type: 'pokemon/addPokemon',
      payload: mockPokemon,
    });

    (setPokemonLoading as unknown as jest.Mock).mockReturnValue({
      type: 'pokemon/setPokemonLoading',
      payload: { name: 'pikachu', loading: true },
    });

    render(<RefreshAllSelectedButton />);

    const button = screen.getByRole('button', { name: /update/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: 'pikachu' }])
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/setPokemonLoading',
        payload: { name: 'pikachu', loading: true },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/addPokemon',
        payload: mockPokemon,
      });

      expect(mockShowSnackbar).toHaveBeenCalledWith(
        '✅ Updated: pikachu',
        false
      );
    });
  });

  it('should handle errors when refreshing pokémon', async () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        pokemonSelection: {
          selected: {
            pikachu: { loading: false, data: mockPokemon },
          },
        },
      })
    );

    mockLoadPokemon.mockReturnValue({
      unwrap: jest
        .fn()
        .mockRejectedValue({ data: { message: 'Network error' } }),
    });

    (setPokemonLoading as unknown as jest.Mock).mockReturnValue({
      type: 'pokemon/setPokemonLoading',
      payload: { name: 'pikachu', loading: true },
    });

    (setPokemonError as unknown as jest.Mock).mockReturnValue({
      type: 'pokemon/setPokemonError',
      payload: { name: 'pikachu', error: 'Network error' },
    });

    render(<RefreshAllSelectedButton />);

    const button = screen.getByRole('button', { name: /update/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: 'pikachu' }])
      );
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/setPokemonLoading',
        payload: { name: 'pikachu', loading: true },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/setPokemonError',
        payload: { name: 'pikachu', error: 'Network error' },
      });

      expect(mockShowSnackbar).toHaveBeenCalledWith(
        ' ❌ Errors: pikachu',
        true
      );
    });
  });
});
