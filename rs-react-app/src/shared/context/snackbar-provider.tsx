import { createContext, FC, ReactNode, useCallback, useState } from 'react';
import { Snackbar } from '@/shared';

export type SnackbarContextType = {
  showSnackbar: (message: string, isError?: boolean) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    isError?: boolean;
  } | null>(null);

  const showSnackbar = useCallback((message: string, isError = false) => {
    setSnackbar({ message, isError });
  }, []);

  const hideSnackbar = useCallback(() => setSnackbar(null), []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        message={snackbar?.message ?? null}
        isError={snackbar?.isError}
        onClose={hideSnackbar}
      />
    </SnackbarContext.Provider>
  );
};
