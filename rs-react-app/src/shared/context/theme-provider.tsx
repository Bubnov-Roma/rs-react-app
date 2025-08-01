import { ReactNode, useEffect } from 'react';
import { ThemeContext } from './contexts';
import { Theme } from '../interfaces';
import { useStorage } from '../hooks';

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
      {/* <div className={`theme-${storedTheme}`}>{children}</div> */}
      {children}
    </ThemeContext.Provider>
  );
};
