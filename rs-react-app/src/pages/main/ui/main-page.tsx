import { SearchInput } from './search-section/search-input';
import React from 'react';
import { Table } from './table-section';
import { fetchData, getPokemon, getSearchPokemon } from '../api';
import { ErrorBoundary, getStorage, type PokemonList } from '@/shared';
import { ErrorButton, PaginationButtons } from './buttons-section';

export class MainPage extends React.Component {
  state = {
    query: '',
    data: [],
    loading: false,
    error: null,
  };

  getAllPromises = async (promises: PokemonList[]) => {
    const resultArr = promises.map(
      async (data: { url: string }) => await getPokemon(data.url)
    );
    const data = await Promise.all(resultArr);
    return data;
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
      const response = await fetchData();
      try {
        if (typeof response !== 'string' && response) {
          const data = await this.getAllPromises(response?.results);
          this.setState({ data: data, error: null, loading: false });
        }
      } catch (error) {
        if (error instanceof Error)
          this.setState({ error: error.message, loading: false });
      }
    } else {
      try {
        const data = await getSearchPokemon(searchValue.toLowerCase());
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

  handlePagination = async (arr: PokemonList[]) => {
    this.setState({ loading: true });
    const data = await this.getAllPromises(arr);
    this.setState({ data: data, error: null, loading: false });
  };

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (
        <div>
          <ErrorBoundary>
            <SearchInput onSearch={this.handleSearch} />
            <PaginationButtons onMove={this.handlePagination} />
            <ErrorButton onError={this.handleError} />
            <div>Loading...</div>
          </ErrorBoundary>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <ErrorBoundary>
            <SearchInput onSearch={this.handleSearch} />
            <PaginationButtons onMove={this.handlePagination} />
            <ErrorButton onError={this.handleError} />
            <div>{error}</div>
          </ErrorBoundary>
        </div>
      );
    }

    return (
      <div>
        <ErrorBoundary>
          <SearchInput onSearch={this.handleSearch} />
          <PaginationButtons onMove={this.handlePagination} />
          <ErrorButton onError={this.handleError} />
          <Table data={data} />
        </ErrorBoundary>
      </div>
    );
  }
}
