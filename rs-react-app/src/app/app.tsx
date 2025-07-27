import { AppContextProvider, ErrorBoundary } from '@/shared';
import React from 'react';
import { Router } from './router';

export class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <AppContextProvider>
          <Router />
        </AppContextProvider>
      </ErrorBoundary>
    );
  }
}
