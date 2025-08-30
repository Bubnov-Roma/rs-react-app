'use client';

import { ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/app/store/store';
import type { RootState } from '@/app/store/root-reducer';
import { SnackbarProvider, ThemeProvider } from '@/shared';
import persistStore from 'redux-persist/es/persistStore';

type ProvidersProps = {
  initialState?: Partial<RootState>;
  children: ReactNode;
};

export default function ProvidersClient({
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
      <SnackbarProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SnackbarProvider>
    </Provider>
  );

  if (!persistor) {
    return content;
  }

  return content;
}
