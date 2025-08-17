'use client';

import { useCallback, useMemo, useEffect, useState } from 'react';
import { PageContextProps, PokemonList, useStorage } from '@/shared';
import { useGetAllPokemonQuery } from '@/features';
import { PageContext } from './page-context';
import { useSearchParams } from 'next/navigation';
import { ensureSearchParams } from '@/utils';
import PageLoader from '@/app/[locale]/components/PageLoader';

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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const pageFromUrl = Number(searchParams.get('page')) || 1;
    if (pageFromUrl !== numberPage) {
      setNumberPage(pageFromUrl);
    }
  }, [hydrated, numberPage, searchParams, setNumberPage]);

  useEffect(() => {
    if (!hydrated) return;

    const searchFromUrl = searchParams.get('search') || '';
    if (searchFromUrl !== storedSearchValue) {
      setStoredSearchValue(searchFromUrl);
    }
  }, [hydrated, searchParams, storedSearchValue, setStoredSearchValue]);

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

  if (!hydrated) {
    return <PageLoader />;
  }

  return (
    <PageContext.Provider
      value={{
        isLoading: isFetching,
        pageContext,
        Filtered,
        numberPage,
        setNumberPage,
        refetch,
        storedSearchValue,
        setStoredSearchValue,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
