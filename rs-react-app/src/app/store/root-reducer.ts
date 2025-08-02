import { pokemonSelectionReducer } from '@/features';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  pokemonSelection: pokemonSelectionReducer,
});
