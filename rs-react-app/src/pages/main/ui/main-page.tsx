import { ErrorBoundaryNavigate, LoadingComponent, PageContext } from '@/shared';
import { Outlet } from 'react-router-dom';
import { SearchInput } from './components';
import { useContext } from 'react';

export function MainPage() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('PageContext must be used inside PageContext.Provider');
  }
  const { isLoaded } = context;
  return (
    <>
      <SearchInput />
      <ErrorBoundaryNavigate>
        {isLoaded ? <LoadingComponent /> : <Outlet />}
      </ErrorBoundaryNavigate>
    </>
  );
}
