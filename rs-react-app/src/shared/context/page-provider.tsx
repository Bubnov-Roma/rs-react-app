import { useCallback, useEffect, useState } from 'react';
import {
  useStorage,
  PageContext,
  AppContextProviderProps,
  PokemonList,
} from '@/shared';
import { useLazyGetAllPokemonQuery } from '@/features';

export const PageContextProvider = ({ children }: AppContextProviderProps) => {
  const [trigger] = useLazyGetAllPokemonQuery();
  const [pageContext, setPageContext] = useState<PokemonList[]>(null);
  const [initialData, setInitialData] = useState<PokemonList[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const {
    storedValue: storedSearchValue,
    setStoredValue: setStoredSearchValue,
  } = useStorage('storageValue', '');

  const { storedValue: numberPage, setStoredValue: setNumberPage } = useStorage(
    'page',
    null
  );

  const filterByName = useCallback((list: PokemonList[], name: string) => {
    return list.filter((item) => item.name.includes(name));
  }, []);

  const Filtered = useCallback(
    (value: string) => {
      if (initialData) {
        const filtered = filterByName(initialData, value);
        setPageContext(filtered);
      }
    },
    [initialData, filterByName]
  );

  const fetchData = useCallback(async () => {
    try {
      setIsFetching(true);
      const result = await trigger(undefined).unwrap();

      if (result?.results) {
        setInitialData(result.results);
        if (storedSearchValue) {
          const filtered = filterByName(result.results, storedSearchValue);
          setPageContext(filtered);
        } else {
          setPageContext(result.results);
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsFetching(false);
    }
  }, [trigger, storedSearchValue, filterByName]);

  useEffect(() => {
    if (!hasFetched) {
      fetchData();
      setHasFetched(true);
    }
  }, [hasFetched, fetchData]);

  return (
    <PageContext.Provider
      value={{
        isLoaded: isFetching,
        pageContext,
        Filtered,
        numberPage,
        setNumberPage,
        refetch: fetchData,
        storedSearchValue,
        setStoredSearchValue,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
