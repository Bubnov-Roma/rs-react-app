import { renderWithProviders } from '@/utils';
import { MainPage } from '@/pages';
import { screen } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="outlet" />,
}));

describe('MainPage', () => {
  it('should render LoadingComponent if isLoaded = true', () => {
    renderWithProviders(<MainPage />, {
      pageContextValue: { isLoaded: true },
    });

    expect(screen.getByTestId('spinner-container')).toBeInTheDocument();
    expect(screen.queryByTestId('outlet')).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter name pokemon/i)
    ).toBeInTheDocument();
  });

  it('should display Outlet if isLoaded = false', () => {
    renderWithProviders(<MainPage />, {
      pageContextValue: { isLoaded: false },
    });

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner-container')).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter name pokemon/i)
    ).toBeInTheDocument();
  });
});
