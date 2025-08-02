import { useContext } from 'react';
import { ThemeContext } from '../context';
import { ThemeContextType } from '../interfaces';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
