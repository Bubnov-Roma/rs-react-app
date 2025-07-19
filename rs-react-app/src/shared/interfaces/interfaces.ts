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
  readonly onSearch: (searchValue: string) => void;
}

export interface ErrorButtonType {
  readonly onError: (generateError: Error) => void;
}

export interface PaginationButtonsProps {
  readonly onMove: (arr: PokemonList[]) => void;
}
