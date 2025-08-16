'use client';

import { ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/app/store/store';
import type { RootState } from '@/app/store/root-reducer';
import {
  PageContextProvider,
  PokemonList,
  SnackbarProvider,
  ThemeProvider,
} from '@/shared';
import persistStore from 'redux-persist/es/persistStore';

type ProvidersProps = {
  initialList: PokemonList[];
  initialState?: Partial<RootState>;
  children: ReactNode;
};

export default function ProvidersClient({
  initialList,
  initialState,
  children,
}: ProvidersProps) {
  const store = useMemo(() => makeStore(initialState), [initialState]);
  const persistor = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return persistStore(store);
  }, [store]);

  const content = (
    <Provider store={store}>
      <PageContextProvider initialList={initialList}>
        <SnackbarProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SnackbarProvider>
      </PageContextProvider>
    </Provider>
  );

  if (!persistor) {
    return content;
  }

  return content;
}
