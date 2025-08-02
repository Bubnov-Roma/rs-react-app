import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '@/pages/main/ui/components/card';
import { PageContext } from '@/shared';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockSetNumberPage = jest.fn();

const mockPokemon = {
  name: 'pikachu',
  sprites: {
    front_default: 'https://example.com/pikachu.png',
  },
  types: [
    {
      type: {
        name: 'electric',
      },
    },
  ],
  height: '4',
  weight: '60',
  game_indices: new Array(3).fill({ game_index: 1 }),
};

describe('Card component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockSetNumberPage.mockClear();
  });

  it('renders pokemon data correctly', () => {
    render(
      <PageContext.Provider
        value={{
          numberPage: 2,
          setNumberPage: mockSetNumberPage,
          isLoaded: true,
          pageContext: [],
          setPageContext: jest.fn(),
          Filtered: (): void => {},
        }}
      >
        <MemoryRouter>
          <Card {...mockPokemon} />
        </MemoryRouter>
      </PageContext.Provider>
    );

    expect(screen.getByText(/PIKACHU/)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByText(/4/)).toBeInTheDocument();
    expect(screen.getByText(/Weight:/)).toBeInTheDocument();
    expect(screen.getByText(/60/)).toBeInTheDocument();
    expect(screen.getByText(/Battle:/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();

    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://example.com/pikachu.png');
  });

  it('navigates to current page on Close button click', () => {
    render(
      <PageContext.Provider
        value={{
          numberPage: 2,
          setNumberPage: mockSetNumberPage,
          isLoaded: true,
          pageContext: [],
          setPageContext: jest.fn(),
          Filtered: (): void => {},
        }}
      >
        <MemoryRouter>
          <Card {...mockPokemon} />
        </MemoryRouter>
      </PageContext.Provider>
    );

    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);

    expect(mockSetNumberPage).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/page/2');
  });

  it('sets numberPage to 1 and navigates to /page/null (because numberPage is still null)', () => {
    render(
      <PageContext.Provider
        value={{
          numberPage: null,
          setNumberPage: mockSetNumberPage,
          isLoaded: true,
          pageContext: [],
          setPageContext: jest.fn(),
          Filtered: (): void => {},
        }}
      >
        <MemoryRouter>
          <Card {...mockPokemon} />
        </MemoryRouter>
      </PageContext.Provider>
    );

    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);

    expect(mockSetNumberPage).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith('/page/null');
  });
});
