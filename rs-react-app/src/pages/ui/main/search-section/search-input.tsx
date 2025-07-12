import type { SearchInputType } from '@/shared';
import React from 'react';
import { type ChangeEvent } from 'react';

export class SearchInput extends React.Component<SearchInputType> {
  state = {
    searchValue: '',
  };
  constructor(props: SearchInputType) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target) this.setState({ searchValue: event.target.value });
  }

  handleSubmit(event: { preventDefault: () => void }): void {
    event.preventDefault();
    const { searchValue } = this.state;
    this.props.onSearch(searchValue);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.searchValue}
            onChange={this.handleInputChange}
            placeholder="Enter Name Pokemon"
          />
          <button type="submit" onClick={this.handleSubmit}>
            Search
          </button>
        </form>
      </div>
    );
  }
}
