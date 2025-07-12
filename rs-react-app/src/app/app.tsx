import { MainPage } from '@/pages';
import { ErrorBoundary } from '@/shared/ui/error-boundary';
import React from 'react';

export class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    );
  }
}
