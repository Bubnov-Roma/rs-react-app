import { MainPage } from '@/pages';
import { ErrorBoundary } from '@/shared';
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
