import { useContext } from 'react';
import {
  ErrorBoundaryNavigate,
  Header,
  LoadingComponent,
  Main,
  PageContext,
} from '@/shared';
import style from './style.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { SearchInput } from './components';

export function MainPage() {
  const navigate = useNavigate();
  const { isLoaded } = useContext(PageContext);

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
          <SearchInput />
          <ErrorBoundaryNavigate>
            {isLoaded ? <LoadingComponent /> : <Outlet />}
          </ErrorBoundaryNavigate>
        </>
      </Main>
    </div>
  );
}
