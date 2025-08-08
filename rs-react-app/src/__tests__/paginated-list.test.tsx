import React from 'react';
import { render, screen } from '@testing-library/react';
import { PaginatedList } from '../pages/main/ui/components/paginated-list';
import { DataListProps, PageContext, PaginationProps } from '@/shared';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../pages/main/ui/components/card-list', () => ({
  CardList: (props: DataListProps) => (
    <div data-testid="card-list">
      CardList: page={props.currentPage}, items={props.data.length}
    </div>
  ),
}));

jest.mock('../pages/main/ui/components/pagination', () => ({
  Pagination: (props: PaginationProps) => (
    <div data-testid="pagination">
      Pagination: totalItems={props.totalItems}, itemsPerPage=
      {props.itemsPerPage}
    </div>
  ),
}));

jest.mock('@/shared', () => ({
  ...jest.requireActual('@/shared'),
  LoadingComponent: () => <div data-testid="loading-component">Loading...</div>,
}));

const mockNavigate = jest.fn();
const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
  };
});

describe('PaginatedList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders LoadingComponent if pageContext is null', () => {
    mockUseParams.mockReturnValue({ page: '1' });

    render(
      <PageContext.Provider value={{ pageContext: null, numberPage: 1 }}>
        <MemoryRouter>
          <PaginatedList />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
    expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('renders CardList and Pagination if pageContext is present', () => {
    const data = [
      { name: 'pikachu' },
      { name: 'bulbasaur' },
      { name: 'charmander' },
    ];

    mockUseParams.mockReturnValue({ page: '1' });

    render(
      <PageContext.Provider value={{ pageContext: data, numberPage: 1 }}>
        <MemoryRouter>
          <PaginatedList />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(screen.getByTestId('card-list')).toHaveTextContent(
      'CardList: page=1'
    );
    expect(screen.getByTestId('pagination')).toHaveTextContent('totalItems=3');
    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument();
  });

  it('redirects to /404 if page param is missing', () => {
    mockUseParams.mockReturnValue({ page: undefined });

    render(
      <PageContext.Provider value={{ pageContext: [], numberPage: 1 }}>
        <MemoryRouter>
          <PaginatedList />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/404');
  });

  it('navigates to /page/numberPage on mount and numberPage change', () => {
    mockUseParams.mockReturnValue({ page: '1' });

    const { rerender } = render(
      <PageContext.Provider value={{ pageContext: [], numberPage: 1 }}>
        <MemoryRouter>
          <PaginatedList />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/page/1');

    rerender(
      <PageContext.Provider value={{ pageContext: [], numberPage: 2 }}>
        <MemoryRouter>
          <PaginatedList />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/page/2');
  });
});
