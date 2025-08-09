import { createContext, ReactNode, useEffect } from 'react';
import { Theme, ThemeContextType } from '../interfaces';
import { useStorage } from '../hooks';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

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
