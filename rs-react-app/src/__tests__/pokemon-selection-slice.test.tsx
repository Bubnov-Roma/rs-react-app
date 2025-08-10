import {
  pokemonSelectionReducer,
  addPokemon,
  unselectedPokemon,
  clearSelected,
  setPokemonLoading,
  setPokemonError,
} from '@/features';
import { PokemonType } from '@/shared';

const mockPokemon: PokemonType = {
  name: 'pikachu',
  height: '4',
  weight: '60',
  game_indices: [1, 2, 3],
  sprites: { front_default: 'url' },
  types: [{ type: { name: 'electric' } }],
};

describe('pokemonSelectionSlice', () => {
  it('should handle addPokemon', () => {
    const nextState = pokemonSelectionReducer(
      undefined,
      addPokemon(mockPokemon)
    );
    expect(nextState.selected['pikachu']).toEqual({
      data: mockPokemon,
      loading: false,
      error: undefined,
    });
  });

  it('should handle unselectedPokemon', () => {
    const stateWithPokemon = {
      selected: {
        pikachu: {
          data: mockPokemon,
          loading: false,
        },
      },
    };
    const nextState = pokemonSelectionReducer(
      stateWithPokemon,
      unselectedPokemon('pikachu')
    );
    expect(nextState.selected).toEqual({});
  });

  it('should handle clearSelected', () => {
    const stateWithPokemons = {
      selected: {
        pikachu: { data: mockPokemon, loading: false },
        bulbasaur: {
          data: { ...mockPokemon, name: 'bulbasaur' },
          loading: false,
        },
      },
    };
    const nextState = pokemonSelectionReducer(
      stateWithPokemons,
      clearSelected()
    );
    expect(nextState.selected).toEqual({});
  });

  it('should handle setPokemonLoading for existing pokemon', () => {
    const state = {
      selected: {
        pikachu: {
          data: mockPokemon,
          loading: false,
        },
      },
    };

    const nextState = pokemonSelectionReducer(
      state,
      setPokemonLoading({ name: 'pikachu', loading: true })
    );

    expect(nextState.selected.pikachu.loading).toBe(true);
    expect(nextState.selected.pikachu.error).toBeUndefined();
  });

  it('should handle setPokemonLoading for new pokemon', () => {
    const state = { selected: {} };
    const nextState = pokemonSelectionReducer(
      state,
      setPokemonLoading({ name: 'charmander', loading: true })
    );

    expect(nextState.selected['charmander']).toEqual({ loading: true });
  });

  it('should handle setPokemonError for existing pokemon', () => {
    const state = {
      selected: {
        pikachu: {
          data: mockPokemon,
          loading: true,
        },
      },
    };

    const nextState = pokemonSelectionReducer(
      state,
      setPokemonError({ name: 'pikachu', error: 'Failed to fetch' })
    );

    expect(nextState.selected.pikachu.error).toBe('Failed to fetch');
    expect(nextState.selected.pikachu.loading).toBe(false);
  });

  it('should handle setPokemonError for new pokemon', () => {
    const state = { selected: {} };
    const nextState = pokemonSelectionReducer(
      state,
      setPokemonError({ name: 'mew', error: 'Not found' })
    );

    expect(nextState.selected['mew']).toEqual({
      loading: false,
      error: 'Not found',
    });
  });
});
