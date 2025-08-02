import {
  pokemonSelectionReducer,
  unselectedPokemon,
  clearSelected,
  fetchPokemon,
} from '@/features';
import { PokemonType, PokemonList } from '@/shared';
import { configureStore } from '@reduxjs/toolkit';

global.fetch = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
});

describe('pokemonSelectionSlice', () => {
  it('should handle unselectedPokemon', () => {
    const initialState = {
      selected: {
        pikachu: { loading: false, data: { name: 'pikachu' } as PokemonType },
      },
    };

    const nextState = pokemonSelectionReducer(
      initialState,
      unselectedPokemon('pikachu')
    );

    expect(nextState.selected).toEqual({});
  });

  it('should handle clearSelected', () => {
    const initialState = {
      selected: {
        pikachu: { loading: false, data: { name: 'pikachu' } as PokemonType },
        bulbasaur: { loading: true },
      },
    };

    const nextState = pokemonSelectionReducer(initialState, clearSelected());

    expect(nextState.selected).toEqual({});
  });

  it('should dispatch fetchPokemon successfully', async () => {
    const mockPokemon: PokemonType = {
      name: 'bulbasaur',
      height: '7',
      weight: '69',
      sprites: { front_default: 'image.png' },
      types: [{ type: { name: 'grass' } }],
      game_indices: [],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemon,
    });

    const store = configureStore({
      reducer: {
        pokemonSelection: pokemonSelectionReducer,
      },
    });

    const input: PokemonList = { name: 'bulbasaur', url: '/api/bulbasaur' };
    await store.dispatch(fetchPokemon(input));

    const state = store.getState().pokemonSelection;

    expect(state.selected.bulbasaur.loading).toBe(false);
    expect(state.selected.bulbasaur.data).toEqual(mockPokemon);
  });

  it('should dispatch fetchPokemon with network error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const store = configureStore({
      reducer: {
        pokemonSelection: pokemonSelectionReducer,
      },
    });

    const input: PokemonList = { name: 'pikachu', url: '/api/pikachu' };
    await store.dispatch(fetchPokemon(input));

    const state = store.getState().pokemonSelection;

    expect(state.selected.pikachu.loading).toBe(false);
    expect(state.selected.pikachu.error).toBe('Error network');
  });

  it('should dispatch fetchPokemon with server error (not ok)', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const store = configureStore({
      reducer: {
        pokemonSelection: pokemonSelectionReducer,
      },
    });

    const input: PokemonList = { name: 'charmander', url: '/api/charmander' };
    await store.dispatch(fetchPokemon(input));

    const state = store.getState().pokemonSelection;

    expect(state.selected.charmander.loading).toBe(false);
    expect(state.selected.charmander.error).toBe('Error loading the pokemon');
  });
});
