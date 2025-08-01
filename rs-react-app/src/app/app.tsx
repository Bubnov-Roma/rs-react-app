import React from 'react';
import { Router } from './router';

export class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    );
  }
}
