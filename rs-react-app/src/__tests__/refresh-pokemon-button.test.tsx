import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RefreshPokemonButton } from '@/pages/main/ui/components/refresh-pokemon-button';
import React from 'react';
import { useAppDispatch, useSnackbar } from '@/shared';
import {
  useLazyGetPokemonByNameQuery,
  addPokemon,
  setPokemonError,
  setPokemonLoading,
} from '@/features';

jest.mock('@/shared', () => ({
  __esModule: true,
  ...jest.requireActual('@/shared'),
  useAppDispatch: jest.fn(),
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

describe('RefreshPokemonButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (setPokemonLoading as unknown as jest.Mock).mockImplementation(
      ({ name, loading }) => ({
        type: 'pokemon/setPokemonLoading',
        payload: { name, loading },
      })
    );

    (setPokemonError as unknown as jest.Mock).mockImplementation(
      ({ name, error }) => ({
        type: 'pokemon/setPokemonError',
        payload: { name, error },
      })
    );

    (addPokemon as unknown as jest.Mock).mockImplementation(
      ({ name, height, weight }) => ({
        type: 'pokemon/addPokemon',
        payload: { name, height, weight },
      })
    );
  });

  it('calls necessary dispatches and snackbar on success', async () => {
    const mockDispatch = jest.fn();
    const mockShowSnackbar = jest.fn();
    const mockUnwrap = jest
      .fn()
      .mockResolvedValue({ name: 'pikachu', height: 4, weight: 60 });
    const mockLoadPokemon = jest.fn().mockReturnValue({ unwrap: mockUnwrap });

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSnackbar as jest.Mock).mockReturnValue({
      showSnackbar: mockShowSnackbar,
    });
    (useLazyGetPokemonByNameQuery as jest.Mock).mockReturnValue([
      mockLoadPokemon,
    ]);

    (setPokemonLoading as unknown as jest.Mock).mockReturnValue({
      type: 'pokemon/setPokemonLoading',
      payload: { name: 'pikachu', loading: true },
    });

    (addPokemon as unknown as jest.Mock).mockReturnValue({
      type: 'pokemon/addPokemon',
      payload: { name: 'pikachu', height: 4, weight: 60 },
    });

    render(<RefreshPokemonButton name="pikachu" />);
    fireEvent.click(screen.getByRole('button', { name: /update pikachu/i }));

    await waitFor(() => {
      expect(mockLoadPokemon).toHaveBeenCalledWith('pikachu');
      expect(mockUnwrap).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/setPokemonLoading',
        payload: { name: 'pikachu', loading: true },
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/addPokemon',
        payload: { name: 'pikachu', height: 4, weight: 60 },
      });
      expect(mockShowSnackbar).toHaveBeenCalledWith(
        '✅ pikachu success updated'
      );
    });
  });

  it('shows error snackbar if fetch fails', async () => {
    const mockDispatch = jest.fn();
    const mockShowSnackbar = jest.fn();
    const error = { data: { message: 'Something went wrong' } };

    const mockUnwrap = jest.fn().mockRejectedValue(error);
    const mockLoadPokemon = jest.fn().mockReturnValue({ unwrap: mockUnwrap });

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSnackbar as jest.Mock).mockReturnValue({
      showSnackbar: mockShowSnackbar,
    });
    (useLazyGetPokemonByNameQuery as jest.Mock).mockReturnValue([
      mockLoadPokemon,
    ]);

    render(<RefreshPokemonButton name="pikachu" />);

    fireEvent.click(screen.getByRole('button', { name: /update pikachu/i }));

    await waitFor(() => {
      expect(mockLoadPokemon).toHaveBeenCalledWith('pikachu');
      expect(mockUnwrap).toHaveBeenCalled();

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/setPokemonLoading',
        payload: { name: 'pikachu', loading: true },
      });

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'pokemon/setPokemonError',
        payload: { name: 'pikachu', error: 'Something went wrong' },
      });

      expect(mockShowSnackbar).toHaveBeenCalledWith(
        '❌ Error updating pikachu',
        true
      );
    });
  });
});
