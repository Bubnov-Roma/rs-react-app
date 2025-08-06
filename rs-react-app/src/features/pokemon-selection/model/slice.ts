import { PokemonType } from '@/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonSelectionItem {
  data?: PokemonType;
  loading: boolean;
  error?: string;
}

interface PokemonSelectionState {
  selected: Record<string, PokemonSelectionItem>;
}

const initialState: PokemonSelectionState = {
  selected: {},
};

const pokemonSelectionSlice = createSlice({
  name: 'pokemonSelection',
  initialState,
  reducers: {
    addPokemon(state, action: PayloadAction<PokemonType>) {
      const pokemon = action.payload;
      state.selected[pokemon.name] = {
        data: pokemon,
        loading: false,
      };
    },
    unselectedPokemon(state, action: PayloadAction<string>) {
      const { [action.payload]: _, ...rest } = state.selected;
      void _;
      state.selected = rest;
    },
    clearSelected(state) {
      state.selected = {};
    },
  },
});

export const { addPokemon, unselectedPokemon, clearSelected } =
  pokemonSelectionSlice.actions;
export const pokemonSelectionReducer = pokemonSelectionSlice.reducer;
