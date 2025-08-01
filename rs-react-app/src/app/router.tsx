import {
  AboutPage,
  MainPage,
  NotFoundPage,
  PaginatedList,
  ProductDetail,
} from '@/pages';
import {
  ErrorBoundary,
  Layout,
  PageContextProvider,
  ThemeProvider,
} from '@/shared';
import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';

function MainRedirect(): undefined {
  const navigate = useNavigate();

  useEffect(() => {
    void navigate(`/page/1`);
  }, [navigate]);
  return undefined;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <MainRedirect /> },
      { path: '/about', element: <AboutPage /> },
      {
        path: '/page',
        element: <MainPage />,
        children: [
          {
            path: '/page/:page',
            element: <PaginatedList />,
            children: [
              {
                path: '/page/:page/:pokemonName',
                element: <ProductDetail />,
              },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function Router() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <PageContextProvider>
          <RouterProvider router={router} />
        </PageContextProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
