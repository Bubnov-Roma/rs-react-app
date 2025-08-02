import { render, screen, fireEvent } from '@testing-library/react';
import { Header, PageContext, ThemeContext, ThemeContextType } from '@/shared';
import React from 'react';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('Header component', () => {
  const pageContextMock = {
    numberPage: 5,
    isLoaded: false,
    pageContext: [],
    setPageContext: jest.fn(),
    Filtered: jest.fn(),
    setNumberPage: jest.fn(),
  };

  const themeContextMock: ThemeContextType = {
    theme: 'light',
    toggleTheme: jest.fn(),
  };

  const renderHeader = () =>
    render(
      <ThemeContext.Provider value={themeContextMock}>
        <PageContext.Provider value={pageContextMock}>
          <Header />
        </PageContext.Provider>
      </ThemeContext.Provider>
    );

  it('renders the header with navigation and theme toggle', () => {
    renderHeader();

    expect(
      screen.getByRole('link', { name: /pokémon search/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /main/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('navigates to "page/{numberPage}" when "Main" button is clicked', () => {
    renderHeader();

    fireEvent.click(screen.getByRole('button', { name: /main/i }));

    expect(mockNavigate).toHaveBeenCalledWith('page/5');
  });

  it('navigates to "about" when "About" button is clicked', () => {
    renderHeader();

    fireEvent.click(screen.getByRole('button', { name: /about/i }));

    expect(mockNavigate).toHaveBeenCalledWith('about');
  });

  it('toggles theme on checkbox change', () => {
    renderHeader();

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(themeContextMock.toggleTheme).toHaveBeenCalled();
  });
});
