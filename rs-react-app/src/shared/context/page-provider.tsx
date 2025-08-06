import { useEffect, useState } from 'react';
import { AppContextProviderProps, PokemonList } from '../interfaces';
import { PageContext } from './contexts';
import { useStorage } from '../hooks/use-storage';
import { useGetAllPokemonQuery } from '@/features';

export const PageContextProvider = ({ children }: AppContextProviderProps) => {
  const { data, isLoading } = useGetAllPokemonQuery(undefined);

  const [pageContext, setPageContext] = useState<PokemonList[]>(null);
  const [initialValue, setInitialValue] = useState(null);
  const [numberPage, setNumberPage] = useState<number>(null);

  const { storedValue } = useStorage('storageValue', '');

  useEffect(() => {
    if (data?.results) {
      const allPokemon = data.results;
      setInitialValue(allPokemon);

      if (storedValue) {
        const filtered = allPokemon.filter((item) =>
          item.name.includes(storedValue)
        );
        setPageContext(filtered);
      } else {
        setPageContext(allPokemon);
      }
    }
  }, [data, storedValue]);

  const Filtered = (value: string) => {
    if (initialValue) {
      const result = initialValue.filter((item) => item.name.includes(value));
      setPageContext(result);
    }
  };

  return (
    <PageContext.Provider
      value={{
        isLoaded: isLoading,
        pageContext,
        setPageContext,
        Filtered,
        numberPage,
        setNumberPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
