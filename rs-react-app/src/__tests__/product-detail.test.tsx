import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ProductDetail } from '../pages/main/ui/components/product-detail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getOnePokemon } from '../pages/main/api';
import { PokemonType } from '@/shared/index';

const mockNavigate = jest.fn();

jest.mock('../pages/main/api', () => ({
  getOnePokemon: jest.fn(),
}));

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
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

describe('ProductDetail component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially and then Card', async () => {
    (getOnePokemon as jest.Mock).mockResolvedValueOnce({
      name: 'pikachu',
      sprites: { front_default: 'url' },
      types: [{ type: { name: 'electric' } }],
      height: '4',
      weight: '60',
      game_indices: [],
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

    await waitFor(() => {
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to 404 if pokemon not found', async () => {
    (getOnePokemon as jest.Mock).mockResolvedValueOnce(null);

    render(
      <MemoryRouter initialEntries={['/page/1/unknown']}>
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
