import type { ErrorButtonType } from '@/shared';
import React from 'react';

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
    return <button onClick={this.handleError}>Error Button</button>;
  }
}
