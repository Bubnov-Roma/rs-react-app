import { render, screen } from '@testing-library/react';
import { Header } from '@/shared/ui/header';
import { PageContext, PageContextType } from '@/shared';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

jest.mock('@/shared', () => ({
  ...jest.requireActual('@/shared'),
  ThemeToggle: () => <div data-testid="theme-toggle" />,
}));

const renderHeader = (contextValue: Partial<PageContextType> = {}) => {
  const defaultContext: PageContextType = {
    isLoaded: false,
    pageContext: [],
    Filtered: () => [],
    numberPage: 1,
    setNumberPage: () => {},
    refetch: () => {},
    storedSearchValue: '',
    setStoredSearchValue: () => {},
  };

  return render(
    <PageContext.Provider value={{ ...defaultContext, ...contextValue }}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </PageContext.Provider>
  );
};

describe('Header', () => {
  it('renders title and links correctly', () => {
    renderHeader({ numberPage: 5 });

    expect(
      screen.getByRole('link', { name: /pokémon search/i })
    ).toHaveAttribute('href', '/');

    expect(screen.getByRole('link', { name: /main/i })).toHaveAttribute(
      'href',
      '/page/5'
    );

    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/about'
    );
  });

  it('renders theme toggle component', () => {
    renderHeader();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });
});
