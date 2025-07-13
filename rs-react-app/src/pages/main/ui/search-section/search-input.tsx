import { getStorage, setStorage, type SearchInputType } from '@/shared';
import React from 'react';
import { type ChangeEvent } from 'react';
import style from './style.module.css';

export class SearchInput extends React.Component<SearchInputType> {
  state = {
    searchValue: '',
  };
  constructor(props: SearchInputType) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(): void {
    const storageValue = getStorage();
    this.setState({ searchValue: storageValue });
    if (storageValue) this.props.onSearch(storageValue);
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target) this.setState({ searchValue: event.target.value });
  }

  handleSubmit(event: { preventDefault: () => void }): void {
    event.preventDefault();
    const { searchValue } = this.state;
    setStorage(searchValue);
    this.props.onSearch(searchValue);
  }

  render() {
    return (
      <div className={style.search_block}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <input
            className={style.input}
            type="text"
            value={this.state.searchValue}
            onChange={this.handleInputChange}
            placeholder="Enter Name Pokemon"
          />
          <button
            className={style.button}
            type="submit"
            onClick={this.handleSubmit}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
