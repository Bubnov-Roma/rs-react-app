import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RefreshAllSelectedButton } from '@/features/pokemon-selection/ui/refresh-all-selected-button';
import { useAppDispatch, useAppSelector, useSnackbar } from '@/shared';
import {
  useLazyGetPokemonByNameQuery,
  addPokemon,
  setPokemonError,
  setPokemonLoading,
} from '@/features';
import React from 'react';

jest.mock('@/shared', () => ({
  __esModule: true,
  ...jest.requireActual('@/shared'),
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
  useSnackbar: jest.fn(),
}));

jest.mock('@/features', () => ({
  __esModule: true,
  ...jest.requireActual('@/features'),
  useLazyGetPokemonByNameQuery: jest.fn(),
  addPokemon: jest.fn(),
  setPokemonError: jest.fn(),
  setPokemonLoading: jest.fn(),
  pokemonApi: {
    util: {
      invalidateTags: jest.fn(),
    },
  },
}));

describe('RefreshAllSelectedButton', () => {
  const mockDispatch = jest.fn();
  const mockShowSnackbar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSnackbar as jest.Mock).mockReturnValue({
      showSnackbar: mockShowSnackbar,
    });
  });

  it('should not trigger fetch when no pokémon are selected', () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({ pokemonSelection: { selected: {} } })
    );

    (useLazyGetPokemonByNameQuery as jest.Mock).mockReturnValue([jest.fn()]);

    render(<RefreshAllSelectedButton />);
    const button = screen.getByRole('button', { name: /update/i });
    expect(button).toBeDisabled();
  });

  it('should refresh selected pokémon successfully', async () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        pokemonSelection: {
          selected: {
            pikachu: { loading: false, data: {} },
            bulbasaur: { loading: false, data: {} },
          },
        },
      })
    );

    const mockUnwrap = jest
      .fn()
      .mockResolvedValueOnce({ name: 'pikachu' })
      .mockResolvedValueOnce({ name: 'bulbasaur' });

    const mockLoadPokemon = jest.fn(() => ({ unwrap: mockUnwrap }));
    (useLazyGetPokemonByNameQuery as jest.Mock).mockReturnValue([
      mockLoadPokemon,
    ]);

    (setPokemonLoading as unknown as jest.Mock).mockImplementation(
      ({ name }) => ({
        type: 'pokemon/setPokemonLoading',
        payload: { name, loading: true },
      })
    );

    (addPokemon as unknown as jest.Mock).mockImplementation((data) => ({
      type: 'pokemon/addPokemon',
      payload: data,
    }));

    render(<RefreshAllSelectedButton />);
    const button = screen.getByRole('button', { name: /update/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/setPokemonLoading',
        payload: { name: 'pikachu', loading: true },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/addPokemon',
        payload: { name: 'pikachu' },
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/setPokemonLoading',
        payload: { name: 'bulbasaur', loading: true },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/addPokemon',
        payload: { name: 'bulbasaur' },
      });

      expect(mockShowSnackbar).toHaveBeenCalledWith(
        '✅ Updated: pikachu, bulbasaur',
        false
      );
    });
  });

  it('should handle fetch error for some pokémon', async () => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        pokemonSelection: {
          selected: {
            pikachu: { loading: false, data: {} },
          },
        },
      })
    );

    const mockUnwrap = jest
      .fn()
      .mockRejectedValue({ data: { message: 'Fetch error' } });
    const mockLoadPokemon = jest.fn(() => ({ unwrap: mockUnwrap }));
    (useLazyGetPokemonByNameQuery as jest.Mock).mockReturnValue([
      mockLoadPokemon,
    ]);

    (setPokemonLoading as unknown as jest.Mock).mockImplementation(
      ({ name }) => ({
        type: 'pokemon/setPokemonLoading',
        payload: { name, loading: true },
      })
    );

    (setPokemonError as unknown as jest.Mock).mockImplementation(
      ({ name, error }) => ({
        type: 'pokemon/setPokemonError',
        payload: { name, error },
      })
    );

    render(<RefreshAllSelectedButton />);
    const button = screen.getByRole('button', { name: /update/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/setPokemonLoading',
        payload: { name: 'pikachu', loading: true },
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/setPokemonError',
        payload: { name: 'pikachu', error: 'Fetch error' },
      });

      expect(mockShowSnackbar).toHaveBeenCalledWith(
        ' ❌ Errors: pikachu',
        true
      );
    });
  });
});
