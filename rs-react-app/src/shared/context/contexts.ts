import { createContext } from 'react';
import { PageContextType, ThemeContextType } from '../interfaces';

export const PageContext = createContext<PageContextType>(null);
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
