import { Outlet } from 'react-router-dom';
import { Header } from '@/shared';

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
