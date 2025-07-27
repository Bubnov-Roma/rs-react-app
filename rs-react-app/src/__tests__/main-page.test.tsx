import { render, screen, fireEvent } from '@testing-library/react';
import { MainPage } from '../pages';
import { MemoryRouter } from 'react-router-dom';
import { PageContext, SearchInputType } from '@/shared';
import React from 'react';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
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
  };
});

describe('MainPage', () => {
  const renderWithProviders = () =>
    render(
      <PageContext.Provider
        value={{ Filtered: jest.fn(), setNumberPage: jest.fn(), numberPage: 1 }}
      >
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </PageContext.Provider>
    );

  it('renders button and navigates to About', () => {
    renderWithProviders();

    const button = screen.getByRole('button', { name: /About/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/about', { replace: true });
  });

  it('renders SearchInput and Outlet initially', () => {
    renderWithProviders();

    expect(screen.getByTestId('mock-search')).toBeInTheDocument();
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });

  it('renders LoadingComponent when loading is triggered', () => {
    renderWithProviders();

    const triggerButton = screen.getByRole('button', {
      name: /Trigger Loading/i,
    });
    fireEvent.click(triggerButton);

    expect(screen.getByTestId('mock-loading')).toBeInTheDocument();
  });
});
