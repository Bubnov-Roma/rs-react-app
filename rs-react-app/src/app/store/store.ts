import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, type RootState } from './root-reducer';
import { pokemonApi } from '@/features';

type PreloadedState<T> = Partial<T>;

export function makeStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (gdm) =>
      gdm({ serializableCheck: false }).concat(pokemonApi.middleware),
  });
}
