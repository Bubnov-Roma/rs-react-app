import React from 'react';
import { fetchData, getPokemon } from '../../api';
import type { PaginationButtonsProps } from '@/shared';
import style from './style.module.css';

export class PaginationButtons extends React.Component<PaginationButtonsProps> {
  state = {
    prev: '',
    next: '',
  };

  async componentDidMount() {
    const response = await fetchData();
    if (typeof response !== 'string' && response)
      this.setState({ prev: response.previous, next: response.next });
  }

  handlePrevClick = async () => {
    const response = await getPokemon(this.state.prev);
    if (typeof response !== 'string' && response) {
      this.setState({ prev: response?.previous, next: response?.next });
      const data = await getPokemon(response.previous);
      if (typeof data !== 'string' && data) this.props.onMove(data?.results);
    }
  };

  handleNextClick = async () => {
    const response = await getPokemon(this.state.next);
    if (typeof response !== 'string' && response) {
      this.setState({ prev: response?.previous, next: response?.next });
      const data = await getPokemon(response.next);
      if (typeof data !== 'string' && data) this.props.onMove(data?.results);
    }
  };

  render() {
    return (
      <div className={style.pagination_buttons}>
        <button className={style.button} onClick={this.handlePrevClick}>
          Previous
        </button>
        <button className={style.button} onClick={this.handleNextClick}>
          Next
        </button>
      </div>
    );
  }
}
