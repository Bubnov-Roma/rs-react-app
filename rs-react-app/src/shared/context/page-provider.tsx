import { useCallback, useEffect, useState } from 'react';
import { AppContextProviderProps, PokemonList } from '../interfaces';
import { PageContext } from './contexts';
import { useStorage } from '../hooks/use-storage';
import { useGetAllPokemonQuery } from '@/features';

export const PageContextProvider = ({ children }: AppContextProviderProps) => {
  const { data, isLoading, refetch } = useGetAllPokemonQuery(undefined);

  const [pageContext, setPageContext] = useState<PokemonList[]>(null);
  const [initialData, setInitialData] = useState(null);
  const [numberPage, setNumberPage] = useState<number>(null);

  const { storedValue } = useStorage('storageValue', '');

  const Filtered = useCallback(
    (value: string) => {
      if (initialData) {
        const result = initialData.filter((item: PokemonList) =>
          item.name.includes(value)
        );
        setPageContext(result);
      }
    },
    [initialData]
  );

  useEffect(() => {
    if (data?.results) {
      const allPokemon = data.results;
      setInitialData(allPokemon);
      if (storedValue) {
        Filtered(storedValue);
      } else {
        setPageContext(allPokemon);
      }
    }
  }, [Filtered, data, storedValue]);

  return (
    <PageContext.Provider
      value={{
        isLoaded: isLoading,
        pageContext,
        setPageContext,
        Filtered,
        numberPage,
        setNumberPage,
        refetch,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
