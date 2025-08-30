'use client';

import { useContext } from 'react';
import { PageContext, PageContextType } from '@/shared';

export function usePageContext(): PageContextType {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePageContext must be used within PageContextProvider');
  }
  return context;
}
