import { useContext } from 'react';
import { ThemeContextType } from '../interfaces';
import { ThemeContext } from '../context';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
