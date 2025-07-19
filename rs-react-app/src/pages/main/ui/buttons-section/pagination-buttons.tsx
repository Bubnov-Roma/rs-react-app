import React from 'react';
import { getListOfPokemon } from '../../api';
import type { PaginationButtonsProps } from '@/shared';
import style from './style.module.css';

export class PaginationButtons extends React.Component<PaginationButtonsProps> {
  state = {
    prev: '',
    next: '',
  };

  async componentDidMount() {
    const response = await getListOfPokemon();
    if (response && !(response instanceof Error))
      this.setState({ prev: response.previous, next: response.next });
  }

  handlePrevClick = async () => {
    const response = await getListOfPokemon(this.state.prev);
    if (response && !(response instanceof Error)) {
      this.setState({ prev: response?.previous, next: response?.next });
      const data = await getListOfPokemon(response.previous);
      if (data && !(data instanceof Error)) this.props.onMove(data?.results);
    }
  };

  handleNextClick = async () => {
    const response = await getListOfPokemon(this.state.next);
    if (response && !(response instanceof Error)) {
      this.setState({ prev: response?.previous, next: response?.next });
      const data = await getListOfPokemon(response.next);
      if (data && !(data instanceof Error)) this.props.onMove(data?.results);
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
