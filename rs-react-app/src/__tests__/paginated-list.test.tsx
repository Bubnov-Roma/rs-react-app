import { render, screen } from '@testing-library/react';
import { PaginatedList } from '@/pages/main/ui/components/paginated-list';
import { DataListProps, PageContext, PaginationProps } from '@/shared';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
const mockUseParams = jest.fn();

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
  };
});

jest.mock('@/pages/main/ui/components/card-list', () => ({
  CardList: (props: DataListProps) => (
    <div data-testid="card-list">
      CardList: page={props.currentPage}, items={props.data.length}
    </div>
  ),
}));

jest.mock('@/pages/main/ui/components/pagination', () => ({
  Pagination: (props: PaginationProps) => (
    <div data-testid="pagination">
      Pagination: totalItems={props.totalItems}, itemsPerPage=
      {props.itemsPerPage}
    </div>
  ),
}));

jest.mock('@/features', () => ({
  SelectionPanel: () => (
    <div data-testid="selection-panel">Selection Panel</div>
  ),
}));

jest.mock('@/shared', () => {
  const original = jest.requireActual('@/shared');
  return {
    ...original,
    LoadingComponent: () => (
      <div data-testid="loading-component">Loading...</div>
    ),
  };
});

describe('PaginatedList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to /404 if no page param', () => {
    mockUseParams.mockReturnValue({ page: undefined });

    render(
      <PageContext.Provider
        value={{
          numberPage: 1,
          setNumberPage: jest.fn(),
          pageContext: [],
          Filtered: () => {},
          isLoaded: true,
          setPageContext: jest.fn(),
        }}
      >
        <MemoryRouter>
          <PaginatedList />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/404');
  });

  it('shows loading if pageContext is null', () => {
    mockUseParams.mockReturnValue({ page: '1' });

    render(
      <PageContext.Provider
        value={{
          numberPage: 1,
          setNumberPage: jest.fn(),
          pageContext: null,
          Filtered: () => {},
          isLoaded: true,
          setPageContext: jest.fn(),
        }}
      >
        <MemoryRouter>
          <PaginatedList />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  it('shows fallback text if pageContext is empty', () => {
    mockUseParams.mockReturnValue({ page: '1' });

    render(
      <PageContext.Provider
        value={{
          numberPage: 1,
          setNumberPage: jest.fn(),
          pageContext: [],
          Filtered: () => {},
          isLoaded: true,
          setPageContext: jest.fn(),
        }}
      >
        <MemoryRouter>
          <PaginatedList />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(screen.getByText(/Oops.../)).toBeInTheDocument();
    expect(screen.getByText(/Nothing was found/i)).toBeInTheDocument();
  });

  it('renders CardList, Pagination and SelectionPanel if data present', () => {
    const data = [
      { name: 'pikachu', url: 'test' },
      { name: 'bulbasaur', url: 'test' },
      { name: 'charmander', url: 'test' },
    ];

    mockUseParams.mockReturnValue({ page: '1' });

    render(
      <PageContext.Provider
        value={{
          numberPage: 1,
          setNumberPage: jest.fn(),
          pageContext: data,
          Filtered: () => {},
          isLoaded: true,
          setPageContext: jest.fn(),
        }}
      >
        <MemoryRouter>
          <PaginatedList />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(screen.getByTestId('card-list')).toHaveTextContent('page=1');
    expect(screen.getByTestId('pagination')).toHaveTextContent('totalItems=3');
    expect(screen.getByTestId('selection-panel')).toBeInTheDocument();
  });

  it('navigates to the current page on mount', () => {
    mockUseParams.mockReturnValue({ page: '1' });

    render(
      <PageContext.Provider
        value={{
          numberPage: 2,
          setNumberPage: jest.fn(),
          pageContext: [{ name: 'test', url: 'test' }],
          Filtered: () => {},
          isLoaded: true,
          setPageContext: jest.fn(),
        }}
      >
        <MemoryRouter>
          <PaginatedList />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/page/2');
  });
});
