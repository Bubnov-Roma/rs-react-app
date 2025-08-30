import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { pokemonApi } from '@/features';

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

type PreloadedState = Partial<RootState>;

export function makeStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (gdm) =>
      gdm({ serializableCheck: false }).concat(pokemonApi.middleware),
  });
}
