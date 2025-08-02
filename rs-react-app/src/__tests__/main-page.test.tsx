import { render, screen, fireEvent } from '@testing-library/react';
import { MainPage } from '@/pages';
import { MemoryRouter } from 'react-router-dom';
import { PageContext, type SearchInputType } from '@/shared';
import React from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="mock-outlet">Outlet Content</div>,
}));

jest.mock('../pages/main/ui/components', () => ({
  SearchInput: ({ setStateIsLoading, stateIsLoading }: SearchInputType) => (
    <div data-testid="mock-search">
      <button onClick={() => setStateIsLoading(true)}>Trigger Loading</button>
      <div>{stateIsLoading ? 'Loading On' : 'Loading Off'}</div>
    </div>
  ),
}));

jest.mock('@/shared', () => {
  const actual = jest.requireActual('@/shared');
  return {
    ...actual,
    LoadingComponent: () => <div data-testid="mock-loading">Loading...</div>,
    ErrorBoundaryNavigate: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-error-boundary">{children}</div>
    ),
  };
});

describe('MainPage', () => {
  const renderWithProviders = () =>
    render(
      <PageContext.Provider
        value={{
          Filtered: jest.fn(),
          setNumberPage: jest.fn(),
          numberPage: 1,
          isLoaded: true,
          pageContext: [],
          setPageContext: jest.fn(),
        }}
      >
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </PageContext.Provider>
    );

  it('renders SearchInput and Outlet initially', () => {
    renderWithProviders();

    expect(screen.getByTestId('mock-search')).toBeInTheDocument();
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-loading')).not.toBeInTheDocument();
  });

  it('renders LoadingComponent when loading is triggered', () => {
    renderWithProviders();

    const triggerButton = screen.getByRole('button', {
      name: /Trigger Loading/i,
    });
    fireEvent.click(triggerButton);

    expect(screen.getByTestId('mock-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-outlet')).not.toBeInTheDocument();
  });
});
