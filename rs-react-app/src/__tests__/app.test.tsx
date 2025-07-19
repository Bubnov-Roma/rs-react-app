import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../app';

jest.mock('../pages/main', () => ({
  MainPage: jest.fn(() => <div>MainPage Component</div>),
}));

describe('App component test', () => {
  test('should render MainPage inside ErrorBoundary without errors', () => {
    render(<App />);

    const mainPageContent = screen.getByText('MainPage Component');
    expect(mainPageContent).toBeInTheDocument();
  });
});
