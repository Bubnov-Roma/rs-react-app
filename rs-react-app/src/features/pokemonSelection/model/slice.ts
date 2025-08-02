import { PokemonList, PokemonType } from '@/shared';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const fetchPokemon = createAsyncThunk<
  PokemonType,
  PokemonList,
  { rejectValue: string }
>('pokemonSelection/fetchPokemon', async (pokemon, thunkAPI) => {
  try {
    const response = await fetch(pokemon.url);
    if (!response.ok) {
      return thunkAPI.rejectWithValue('Error loading the pokemon');
    }
    const data: PokemonType = await response.json();
    return data;
  } catch {
    return thunkAPI.rejectWithValue('Error network');
  }
});

const pokemonSelectionSlice = createSlice({
  name: 'pokemonSelection',
  initialState,
  reducers: {
    unselectedPokemon(state, action: PayloadAction<string>) {
      const { [action.payload]: _, ...rest } = state.selected;
      void _;
      state.selected = rest;
    },
    clearSelected(state) {
      state.selected = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state, action) => {
        const name = action.meta.arg.name;
        state.selected[name] = { loading: true };
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        const { name, sprites, types, height, weight } = action.payload;
        state.selected[name] = {
          data: {
            name,
            sprites,
            types,
            height,
            weight,
            game_indices: [],
          },
          loading: false,
        };
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        const name = action.meta.arg.name;
        state.selected[name] = {
          loading: false,
          error: action.payload || 'Unexpected error',
        };
      });
  },
});

export const { unselectedPokemon, clearSelected } =
  pokemonSelectionSlice.actions;
export const pokemonSelectionReducer = pokemonSelectionSlice.reducer;
