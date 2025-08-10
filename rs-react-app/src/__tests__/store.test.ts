import { store } from '@/app/store';
import { addPokemon } from '@/features';
import { PokemonType } from '@/shared';

describe('Redux Store', () => {
  it('should initialize with expected state shape', () => {
    const state = store.getState();

    expect(state).toHaveProperty('pokemonSelection');
    expect(state).toHaveProperty('pokemonApi');
  });

  it('should dispatch addPokemon and update state', () => {
    const mockPokemon: PokemonType = {
      name: 'pikachu',
      height: '4',
      weight: '60',
      sprites: { front_default: 'image.png' },
      types: [{ type: { name: 'electric' } }],
      game_indices: [],
    };

    store.dispatch(addPokemon(mockPokemon));

    const state = store.getState();
    const selected = state.pokemonSelection.selected;

    expect(selected.pikachu.data).toEqual(mockPokemon);
  });
});
