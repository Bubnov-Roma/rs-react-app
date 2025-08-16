'use client';

import { useState, useEffect } from 'react';
import { UseLocalStorageType } from '../interfaces';

const isClient = typeof window !== 'undefined';

export function useStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageType<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isClient) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  return { storedValue, setStoredValue };
}
