import style from './style.module.css';

export const LoadingComponent = () => {
  return (
    <div className={style.spinner_container} data-testid="spinner-container">
      <div className={style.spinner}></div>
    </div>
  );
};
