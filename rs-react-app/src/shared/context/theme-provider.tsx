'use client';

import { ReactNode, useEffect } from 'react';
import { Theme, useStorage } from '@/shared';
import { ThemeContext } from './theme-context';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { storedValue: storedTheme, setStoredValue: setStoredTheme } =
    useStorage<Theme>('theme', 'light');

  const toggleTheme = () => {
    const newTheme = storedTheme === 'light' ? 'dark' : 'light';
    setStoredTheme(newTheme);
  };

  useEffect(() => {
    document.body.className = `theme__${storedTheme}`;
  }, [storedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: storedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
