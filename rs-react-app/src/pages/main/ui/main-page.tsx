import { ErrorBoundaryNavigate, LoadingComponent, PageContext } from '@/shared';
import { Outlet } from 'react-router-dom';
import { SearchInput } from './components';
import { useContext } from 'react';

export function MainPage() {
  const { isLoaded } = useContext(PageContext);
  return (
    <>
      <SearchInput />
      <ErrorBoundaryNavigate>
        {isLoaded ? <LoadingComponent /> : <Outlet />}
      </ErrorBoundaryNavigate>
    </>
  );
}
