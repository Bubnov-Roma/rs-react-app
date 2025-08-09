import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { pokemonApi } from '@/features/pokemon-api/pokemon-api';
import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      pokemonApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
