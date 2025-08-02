import { store } from '@/app/store/store';
import { type ErrorInfo } from 'react';

export interface ErrorBoundaryProps {
  readonly children: React.ReactNode;
  readonly onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  readonly hasError: boolean;
  readonly error: Error | null;
  readonly errorInfo: ErrorInfo | null;
}

type Sprites = {
  [key: string]: string;
};

type TypeInfo = {
  name: string;
};

type MyType = {
  type: TypeInfo;
};

export interface PokemonType {
  readonly sprites: Sprites;
  readonly name: string;
  readonly types: MyType[];
  readonly height: string;
  readonly weight: string;
  readonly game_indices: number[];
}

export interface PokemonList {
  name: string;
  url: string;
}

export interface FetchType {
  next: string;
  previous: string;
  results: PokemonList[];
}

export interface MainPageState {
  readonly query: string;
  readonly data: PokemonType[];
  readonly loading: boolean;
  readonly error: null | Error;
}

export interface MainPageProps {
  readonly query: string;
  readonly data: PokemonType[];
  readonly loading: boolean;
  readonly error: null | Error;
}

export interface CardListType {
  readonly data: PokemonType[];
}

export interface ErrorComponentProps {
  readonly message: string;
}

export interface SearchInputType {
  readonly setStateIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  readonly stateIsLoading: boolean;
}

export interface ErrorButtonType {
  readonly onError: (generateError: Error) => void;
}

export interface PaginationButtonsProps {
  readonly onMove: (arr: PokemonList[]) => void;
}

export interface DataListProps {
  readonly data: PokemonList[];
  readonly currentPage: number;
  readonly itemsPerPage: number;
}

export interface PaginationProps {
  readonly totalItems: number;
  readonly itemsPerPage: number;
  readonly onPageChange: (page: number) => void;
}

export interface AppContextProviderProps {
  readonly children: React.ReactElement;
}
export interface PageContextType {
  readonly isLoaded: boolean;
  readonly pageContext: PokemonList[];
  readonly setPageContext: React.Dispatch<React.SetStateAction<PokemonList[]>>;
  readonly Filtered: (value: string) => void;
  readonly numberPage: number;
  readonly setNumberPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface UseLocalStorageType<T> {
  readonly storedValue: T;
  readonly setStoredValue: (value: T) => void;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  readonly theme: Theme;
  readonly toggleTheme: () => void;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
