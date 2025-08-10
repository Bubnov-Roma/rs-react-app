import { useCallback, useMemo } from 'react';
import { PageContextProps, PokemonList, useStorage } from '@/shared';

import { useGetAllPokemonQuery } from '@/features';
import { PageContext } from './page-context';

export const PageContextProvider = ({ children }: PageContextProps) => {
  const { data, refetch, isFetching } = useGetAllPokemonQuery(undefined);

  const {
    storedValue: storedSearchValue,
    setStoredValue: setStoredSearchValue,
  } = useStorage('storageValue', '');

  const { storedValue: numberPage, setStoredValue: setNumberPage } = useStorage(
    'page',
    null
  );

  const Filtered = useCallback(
    (value: string) => {
      if (!data?.results) return;
      const filtered = data.results.filter((item: PokemonList) =>
        item.name.includes(value)
      );
      setStoredSearchValue(value);
      return filtered;
    },
    [data, setStoredSearchValue]
  );

  const pageContext = useMemo(() => {
    if (!data?.results) return null;
    if (storedSearchValue) {
      const result = Filtered(storedSearchValue);
      return result;
    }
    return data.results;
  }, [data, storedSearchValue, Filtered]);

  return (
    <PageContext.Provider
      value={{
        isLoaded: isFetching,
        pageContext,
        Filtered,
        numberPage,
        setNumberPage,
        refetch,
        storedSearchValue,
        setStoredSearchValue,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
