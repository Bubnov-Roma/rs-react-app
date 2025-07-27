import { getAllPokemon } from '@/pages/main/api';
import { useEffect, useState } from 'react';
import { AppContextProviderProps } from './interfaces';
import { PageContext } from './context';
import { useLocalStorage } from './use-local-storage';

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [pageContext, setPageContext] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialValue, setInitialValue] = useState(null);
  const [stateValue] = useLocalStorage('storageValue', '');
  const [numberPage, setNumberPage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoaded(true);
      try {
        const response = await getAllPokemon();
        if (stateValue) {
          const result = response.results.filter((item) =>
            item.name.includes(stateValue)
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
  }, [stateValue]);

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
