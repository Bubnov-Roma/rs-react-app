import React from 'react';
import style from './style.module.css';
import type { ErrorComponentProps } from '@/shared';
export class ErrorComponent extends React.Component<ErrorComponentProps> {
  render() {
    const { message } = this.props;
    return (
      <div className={style.error}>
        <h1 className={style.message}>{message}</h1>
      </div>
    );
  }
}
