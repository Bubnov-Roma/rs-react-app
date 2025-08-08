import { getAllPokemon } from '@/pages/main/api';
import { useEffect, useState } from 'react';
import { AppContextProviderProps, PokemonList } from './interfaces';
import { PageContext } from './context';
import { useLocalStorage } from './use-local-storage';

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [pageContext, setPageContext] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialValue, setInitialValue] = useState(null);
  const [storedValue] = useLocalStorage('storageValue', '');
  const [, setStoredPage] = useLocalStorage('page', null);
  const [numberPage, setNumberPage] = useState(null);

  const filterByName = (data: PokemonList[], name: string) => {
    const result = data.filter((item) => item.name.includes(name));
    setPageContext(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(true);
      try {
        const response = await getAllPokemon();
        setInitialValue(response.results);
        setIsLoaded(false);
      } catch (error) {
        console.error(error);
        setIsLoaded(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!initialValue) return;
    if (storedValue) {
      filterByName(initialValue, storedValue);
    } else {
      setPageContext(initialValue);
    }
  }, [storedValue, initialValue]);

  useEffect(() => {
    console.log('useEffect');
    if (numberPage) {
      setStoredPage(numberPage);
    }
  }, [numberPage, setStoredPage]);

  const Filtered = (value: string) => {
    if (initialValue) {
      filterByName(initialValue, value);
    }
  };

  return (
    <PageContext.Provider
      value={{
        isLoaded,
        pageContext,
        Filtered,
        numberPage,
        setNumberPage,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
