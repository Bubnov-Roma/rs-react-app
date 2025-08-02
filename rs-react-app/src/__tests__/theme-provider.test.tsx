import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '@/shared';

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  const TestComponent = () => {
    const context = useContext(ThemeContext);
    if (!context) return null;

    return (
      <div>
        <span data-testid="current-theme">{context.theme}</span>
        <button onClick={context.toggleTheme}>Toggle Theme</button>
      </div>
    );
  };

  it('should use default light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme').textContent).toBe('light');
    expect(document.body.className).toBe('theme__light');
  });

  it('should toggle to dark theme on button click', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText('Toggle Theme');
    fireEvent.click(button);
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === null) {
      throw new Error('Theme not found in localStorage');
    }

    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
    expect(document.body.className).toBe('theme__dark');
    expect(JSON.parse(storedTheme)).toBe('dark');
  });

  it('should restore theme from localStorage', () => {
    localStorage.setItem('theme', JSON.stringify('dark'));

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme').textContent).toBe('dark');
    expect(document.body.className).toBe('theme__dark');
  });
});
