'use client';

import { createContext } from 'react';
import { PageContextType } from '../interfaces';

export const PageContext = createContext<PageContextType | undefined>(
  undefined
);
