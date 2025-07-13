import { SearchInput } from './search-section/search-input';
import React from 'react';
import { Table } from './table-section';
import { fetchData, getPokemon, getSearchPokemon } from '../api';
import { ErrorBoundary, getStorage } from '@/shared';
import type { PokemonType } from '@/shared';
import { ErrorButton } from './buttons-section';

export class MainPage extends React.Component {
  state = {
    query: '',
    data: [],
    loading: false,
    error: null,
  };
  componentDidMount = async () => {
    const storageValue = getStorage();
    if (storageValue) {
      this.handleSearch(storageValue);
    } else this.handleSearch();
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
          this.setState({ error: error.message, loading: false });
      }
    } else {
      try {
        const data: PokemonType = await getSearchPokemon(
          searchValue.toLowerCase()
        );
        if (data instanceof Error) {
          this.setState({ error: data.message, loading: false });
        } else this.setState({ data: [data], error: null, loading: false });
      } catch (error) {
        if (error instanceof Error)
          this.setState({ error: error.message, loading: false });
      }
    }
  };

  handleError = (generateError: Error) => {
    this.setState({ error: null, loading: false });
    if (generateError) {
      this.setState({ error: generateError.message, loading: false });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (
        <div>
          <ErrorBoundary>
            <SearchInput onSearch={this.handleSearch} />
            <div>Loading...</div>
            <ErrorButton onError={this.handleError} />
          </ErrorBoundary>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <ErrorBoundary>
            <SearchInput onSearch={this.handleSearch} />
            <div>{error}</div>
            <ErrorButton onError={this.handleError} />
          </ErrorBoundary>
        </div>
      );
    }

    return (
      <div>
        <ErrorBoundary>
          <SearchInput onSearch={this.handleSearch} />
          <Table data={data} />
          <ErrorButton onError={this.handleError} />
        </ErrorBoundary>
      </div>
    );
  }
}
