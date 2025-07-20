import type { ErrorButtonType } from '@/shared';
import React from 'react';
import style from './style.module.css';

export class ErrorButton extends React.Component<ErrorButtonType> {
  handleError = () => {
    if (this.props.onError) {
      try {
        throw new Error('Generated Error!');
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          this.props.onError(error);
        }
      }
    }
  };
  render() {
    return (
      <button className={style.button} onClick={this.handleError}>
        Error Button
      </button>
    );
  }
}
