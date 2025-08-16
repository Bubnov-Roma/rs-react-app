'use client';

import { useCallback, useMemo, useEffect } from 'react';
import { PageContextProps, PokemonList, useStorage } from '@/shared';
import { useGetAllPokemonQuery } from '@/features';
import { PageContext } from './page-context';
import { useSearchParams } from 'next/navigation';
import { ensureSearchParams } from '@/utils';

type Props = PageContextProps & {
  initialList?: PokemonList[];
};

export const PageContextProvider = ({ children, initialList = [] }: Props) => {
  const { data, refetch, isFetching } = useGetAllPokemonQuery(undefined);
  const searchParams = ensureSearchParams(useSearchParams());

  const {
    storedValue: storedSearchValue,
    setStoredValue: setStoredSearchValue,
  } = useStorage('storageValue', '');

  const { storedValue: numberPage, setStoredValue: setNumberPage } = useStorage(
    'page',
    1
  );

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('page')) || 1;
    if (pageFromUrl !== numberPage) {
      setNumberPage(pageFromUrl);
    }
  }, [numberPage, searchParams, setNumberPage]);

  useEffect(() => {
    const searchFromUrl = searchParams.get('search') || '';
    if (searchFromUrl !== storedSearchValue) {
      setStoredSearchValue(searchFromUrl);
    }
  }, [searchParams, storedSearchValue, setStoredSearchValue]);

  const Filtered = useCallback(
    (value: string) => {
      const source = data?.results ?? initialList;
      if (!source) return [];
      return source.filter((item: PokemonList) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    },
    [data, initialList]
  );

  const pageContext = useMemo(() => {
    const source = data?.results ?? initialList;
    if (!source) return [];
    if (storedSearchValue) {
      return Filtered(storedSearchValue);
    }
    return source;
  }, [data, initialList, storedSearchValue, Filtered]);

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
