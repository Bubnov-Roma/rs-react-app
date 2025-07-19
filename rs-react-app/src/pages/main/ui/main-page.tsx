import { SearchInput } from './search-section/search-input';
import React from 'react';
import { Table } from './table-section';
import { getListOfPokemon, getOnePokemon } from '../api';
import { ErrorBoundary, getStorage, type PokemonList } from '@/shared';
import { ErrorButton, PaginationButtons } from './buttons-section';
import style from './style.module.css';
import { ErrorComponent, LoadingComponent } from './components-section';

export class MainPage extends React.Component {
  state = {
    query: '',
    data: [],
    loading: true,
    error: null,
  };

  getAllPromises = async (promises: PokemonList[]) => {
    const resultArr = promises.map(
      async (data: { url: string }) => await getListOfPokemon(data.url)
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
      const response = await getListOfPokemon();
      if (response instanceof Error) {
        this.setState({ error: response.message, loading: false });
      } else {
        const data = await this.getAllPromises(response?.results);
        this.setState({ data: data, error: null, loading: false });
      }
    } else {
      const response = await getOnePokemon(searchValue.toLowerCase());
      if (response instanceof Error) {
        this.setState({ error: response.message, loading: false });
      } else {
        this.setState({ data: [response], error: null, loading: false });
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

    return (
      <div className={style.main}>
        <SearchInput onSearch={this.handleSearch} />
        <PaginationButtons onMove={this.handlePagination} />
        <ErrorButton onError={this.handleError} />
        <ErrorBoundary>
          {loading ? (
            <LoadingComponent />
          ) : error ? (
            <ErrorComponent message={this.state.error} />
          ) : (
            <Table data={data} />
          )}
        </ErrorBoundary>
      </div>
    );
  }
}
