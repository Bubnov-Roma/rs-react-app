import { render, screen, waitFor } from '@testing-library/react';
import { ProductDetail } from '../pages/main/ui/components/product-detail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { PokemonType } from '@/shared';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...original,
    useNavigate: () => mockNavigate,
  };
});

jest.mock('../pages/main/ui/components/card', () => ({
  Card: (props: PokemonType) => (
    <div data-testid="card">Mocked Card for {props.name}</div>
  ),
}));

jest.mock('@/shared', () => ({
  ...jest.requireActual('@/shared'),
  LoadingComponent: () => <div data-testid="loading">Loading...</div>,
}));

const mockUseGetPokemonByNameQuery = jest.fn();

jest.mock('@/features/pokemon-api/pokemon-api', () => ({
  ...jest.requireActual('@/features/pokemon-api/pokemon-api'),
  useGetPokemonByNameQuery: (name: string, opts: string[]) =>
    mockUseGetPokemonByNameQuery(name, opts),
}));

describe('ProductDetail component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially and then Card', async () => {
    mockUseGetPokemonByNameQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/page/1/pikachu']}>
        <Routes>
          <Route
            path="/page/:numberPage/:pokemonName"
            element={<ProductDetail />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders card after loading finishes', async () => {
    mockUseGetPokemonByNameQuery.mockReturnValueOnce({
      data: {
        name: 'pikachu',
        sprites: { front_default: 'url' },
        types: [{ type: { name: 'electric' } }],
        height: '4',
        weight: '60',
        game_indices: [],
      },
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/page/1/pikachu']}>
        <Routes>
          <Route
            path="/page/:numberPage/:pokemonName"
            element={<ProductDetail />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByTestId('card')).toBeInTheDocument();
  });

  it('navigates to 404 if there is an error', async () => {
    mockUseGetPokemonByNameQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(
      <MemoryRouter initialEntries={['/page/1/missingmon']}>
        <Routes>
          <Route
            path="/page/:numberPage/:pokemonName"
            element={<ProductDetail />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/404');
    });
  });

  it('navigates to 404 if pokemonName param is missing', async () => {
    mockUseGetPokemonByNameQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route path="/page/:numberPage" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/404');
    });
  });
});
