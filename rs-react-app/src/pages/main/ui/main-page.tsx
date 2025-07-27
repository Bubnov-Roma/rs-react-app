import { useState } from 'react';
import {
  ErrorBoundaryNavigate,
  Header,
  LoadingComponent,
  Main,
} from '@/shared';
import style from './style.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { SearchInput } from './components';

export function MainPage() {
  const [stateIsLoading, setStateIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/about`, { replace: true });
  };

  return (
    <div className={style.main_page}>
      <Header>
        <button className={style.navigate} onClick={handleClick}>
          About
        </button>
      </Header>
      <Main>
        <>
          <SearchInput
            setStateIsLoading={setStateIsLoading}
            stateIsLoading={stateIsLoading}
          />
          <ErrorBoundaryNavigate>
            {stateIsLoading ? <LoadingComponent /> : <Outlet />}
          </ErrorBoundaryNavigate>
        </>
      </Main>
    </div>
  );
}
