import { pokemonSelectionReducer, pokemonApi } from '@/features';
import { combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'pokemonSelection',
  storage,
  whitelist: ['pokemonSelection'],
};

const persistedPokemonSelectionReducer = persistReducer(
  persistConfig,
  pokemonSelectionReducer
);

export const rootReducer = combineReducers({
  pokemonSelection: persistedPokemonSelectionReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});
