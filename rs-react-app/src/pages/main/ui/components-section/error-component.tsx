import React from 'react';
import style from './style.module.css';
export class ErrorComponent extends React.Component {
  render() {
    return (
      <div className={style.error}>
        <h1 className={style.message}>Generated Error</h1>
      </div>
    );
  }
}
