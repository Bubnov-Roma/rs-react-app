'use client';

import { createContext } from 'react';

export type SnackbarContextType = {
  showSnackbar: (message: string, isError?: boolean) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);
