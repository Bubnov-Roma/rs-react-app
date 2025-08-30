'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { PageContext } from './page-context';
import { ITEMS_PER_PAGE, PokemonList } from '@/shared';

type Props = {
  children?: React.ReactNode;
  initialList?: PokemonList[];
};

export const PageContextProvider = ({ children, initialList = [] }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const urlSearch = searchParams.get('search') ?? '';
    const urlPage = Number(searchParams.get('page') ?? 1);

    setSearch(urlSearch);
    setPage(urlPage);
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (!search) return initialList;
    return initialList.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [initialList, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const goToPage = useCallback(
    (newPage: number) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set('page', String(newPage));
      if (search) next.set('search', search);
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, search]
  );

  const setSearchValue = useCallback(
    (value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value) {
        next.set('search', value);
      } else {
        next.delete('search');
      }
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <PageContext.Provider
      value={{
        isLoading: false,
        pageContext: paginated,
        Filtered: (v: string) =>
          initialList.filter((item) =>
            item.name.toLowerCase().includes(v.toLowerCase())
          ),
        numberPage: page,
        setNumberPage: goToPage,
        storedSearchValue: search,
        setStoredSearchValue: setSearchValue,
        isDrawerOpen,
        setIsDrawerOpen,
        refetch: async () => {},
        totalItems: filtered.length,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
