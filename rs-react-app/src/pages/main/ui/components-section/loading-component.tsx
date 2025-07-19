import React from 'react';
import style from './style.module.css';

export class LoadingComponent extends React.Component {
  render() {
    return (
      <div className={style.spinner_container}>
        <div className={style.spinner}></div>
      </div>
    );
  }
}
