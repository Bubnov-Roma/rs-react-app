import { SearchInput } from './search-section/search-input';
import React from 'react';
import { CardList } from './table-section';
import {
  fetchData,
  getPokemon,
  getSearchPokemon,
} from '@/shared/api/get-pokemon';
import { ErrorBoundary } from '@/shared/ui/error-boundary';
import type { MainPageProps, MainPageState, PokemonType } from '@/shared';

export class MainPage extends React.Component<MainPageState, MainPageProps> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {
      query: '',
      data: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount = async () => {
    this.handleSearch();
  };

  handleSearch = async (searchValue?: string) => {
    this.setState({ loading: true });
    if (!searchValue || searchValue.startsWith(' ')) {
      const query = await fetchData();
      const all: PokemonType[] = query.results.map(
        async (data: { url: string }) => await getPokemon(data.url)
      );
      try {
        const listOfPokemon: PokemonType[] = await Promise.all(all);
        this.setState({ data: listOfPokemon, error: null, loading: false });
      } catch (error) {
        if (error instanceof Error)
          this.setState({ error: error, loading: false });
      }
    } else {
      try {
        const data: PokemonType = await getSearchPokemon(
          searchValue.toLowerCase()
        );
        if (data instanceof Error) {
          this.setState({ error: data, loading: false });
        } else this.setState({ data: [data], error: null, loading: false });
      } catch (error) {
        if (error instanceof Error)
          this.setState({ error: error, loading: false });
      }
    }
  };

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (
        <div>
          <SearchInput onSearch={this.handleSearch} />
          <ErrorBoundary>
            <p>Loading...</p>
          </ErrorBoundary>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <SearchInput onSearch={this.handleSearch} />
          <ErrorBoundary>{error.message}</ErrorBoundary>
        </div>
      );
    }

    return (
      <div>
        <SearchInput onSearch={this.handleSearch} />
        <ErrorBoundary>
          <CardList data={data} />
        </ErrorBoundary>
      </div>
    );
  }
}
