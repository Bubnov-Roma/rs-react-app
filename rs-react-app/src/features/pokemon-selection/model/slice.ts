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
        error: undefined,
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
    setPokemonLoading(
      state,
      action: PayloadAction<{ name: string; loading: boolean }>
    ) {
      const { name, loading } = action.payload;
      if (!state.selected[name]) {
        state.selected[name] = { loading };
      } else {
        state.selected[name].loading = loading;
        if (loading) {
          state.selected[name].error = undefined;
        }
      }
    },
    setPokemonError(
      state,
      action: PayloadAction<{ name: string; error: string }>
    ) {
      const { name, error } = action.payload;
      if (!state.selected[name]) {
        state.selected[name] = { loading: false, error };
      } else {
        state.selected[name].error = error;
        state.selected[name].loading = false;
      }
    },
  },
});

export const {
  addPokemon,
  unselectedPokemon,
  clearSelected,
  setPokemonLoading,
  setPokemonError,
} = pokemonSelectionSlice.actions;

export const pokemonSelectionReducer = pokemonSelectionSlice.reducer;
