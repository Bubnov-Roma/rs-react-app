import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '@/features/pokemon-api/pokemon-api';
import { RootState } from '../app/store';
import { rootReducer } from '../app/store/root-reducer';
import { PageContext, PageContextType, SnackbarProvider } from '@/shared';

export const makeTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        pokemonApi.middleware
      ),
    preloadedState,
  });

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = makeTestStore(preloadedState),
    pageContextValue = {},
    ...renderOptions
  }: {
    preloadedState?: Partial<RootState>;
    store?: ReturnType<typeof makeTestStore>;
    pageContextValue?: Partial<PageContextType>;
  } = {}
) {
  const defaultPageContext: PageContextType = {
    isLoaded: false,
    pageContext: [],
    Filtered: () => [],
    numberPage: 1,
    setNumberPage: () => {},
    refetch: () => {},
    storedSearchValue: '',
    setStoredSearchValue: () => {},
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <PageContext.Provider
        value={{ ...defaultPageContext, ...pageContextValue }}
      >
        <MemoryRouter>
          <SnackbarProvider>{children}</SnackbarProvider>
        </MemoryRouter>
      </PageContext.Provider>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper, ...renderOptions }),
  };
}
