import React from 'react';
import { Router } from './router';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from '@/shared';

export const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider>
            <Router />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};
