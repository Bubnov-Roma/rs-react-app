import { useState } from 'react';
import { ErrorBoundaryNavigate, LoadingComponent } from '@/shared';
import { Outlet } from 'react-router-dom';
import { SearchInput } from './components';

export function MainPage() {
  const [stateIsLoading, setStateIsLoading] = useState(false);

  return (
    <>
      <SearchInput
        setStateIsLoading={setStateIsLoading}
        stateIsLoading={stateIsLoading}
      />
      <ErrorBoundaryNavigate>
        {stateIsLoading ? <LoadingComponent /> : <Outlet />}
      </ErrorBoundaryNavigate>
    </>
  );
}
