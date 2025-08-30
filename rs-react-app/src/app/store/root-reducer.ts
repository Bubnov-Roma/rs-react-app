import { combineReducers } from '@reduxjs/toolkit';
import { pokemonApi } from '@/features/pokemon-api/pokemon-api';
import { pokemonSelectionReducer } from '@/features';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const isServer = typeof window === 'undefined';
const persistConfig = {
  key: 'pokemonSelection',
  storage,
  whitelist: ['pokemonSelection'],
};

const pokemonSelection = isServer
  ? pokemonSelectionReducer
  : persistReducer(persistConfig, pokemonSelectionReducer);

export const rootReducer = combineReducers({
  pokemonSelection,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
