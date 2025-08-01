import { getAllPokemon } from '@/pages/main/api';
import { useEffect, useState } from 'react';
import { AppContextProviderProps, PokemonList } from '../interfaces';
import { PageContext } from './contexts';
import { useStorage } from '../hooks/use-storage';

export const PageContextProvider = ({ children }: AppContextProviderProps) => {
  const [pageContext, setPageContext] = useState<PokemonList[]>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialValue, setInitialValue] = useState(null);
  const { storedValue } = useStorage('storageValue', '');
  const [numberPage, setNumberPage] = useState<number>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoaded(true);
      try {
        const response = await getAllPokemon();
        if (storedValue) {
          const result = response.results.filter((item) =>
            item.name.includes(storedValue)
          );
          setIsLoaded(false);
          setInitialValue(response.results);
          setPageContext(result);
        } else {
          setInitialValue(response.results);
          setPageContext(response.results);
          setIsLoaded(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoaded(false);
      }
    }
    fetchData();
  }, [storedValue]);

  const Filtered = (value: string) => {
    setIsLoaded(true);
    if (initialValue) {
      const result = initialValue.filter((item) => item.name.includes(value));
      setIsLoaded(false);
      setPageContext(result);
    }
  };

  return (
    <PageContext.Provider
      value={{
        isLoaded,
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
