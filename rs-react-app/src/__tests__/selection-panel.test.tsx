import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SelectionPanel } from '@/features';
import { PokemonType } from '@/shared';
import { saveAs } from 'file-saver';

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('@/shared/hooks/use-app-dispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

const mockSelected = {
  bulbasaur: {
    loading: false,
    data: {
      name: 'bulbasaur',
      height: '7',
      weight: '69',
      sprites: { front_default: 'img.png' },
      types: [{ type: { name: 'grass' } }],
      game_indices: [],
    } as PokemonType,
  },
};

jest.mock('@/shared/hooks/use-app-selector', () => ({
  useAppSelector: (selector) =>
    selector({
      pokemonSelection: {
        selected: mockSelected,
      },
    }),
}));

describe('SelectionPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render when Pokémon with data exists', () => {
    const { container } = render(<SelectionPanel />);

    expect(screen.getByText(/Unselect all/i)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
    expect(container.textContent).toContain('1 Pokémon selected');
  });

  it('should call dispatch(clearSelected) when "Unselect all" is clicked', () => {
    render(<SelectionPanel />);
    fireEvent.click(screen.getByText(/Unselect all/i));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should trigger CSV download when "Download" is clicked', () => {
    render(<SelectionPanel />);
    fireEvent.click(screen.getByText(/Download/i));

    expect(saveAs).toHaveBeenCalledTimes(1);
    expect(saveAs).toHaveBeenCalledWith(
      expect.any(Blob),
      expect.stringMatching(/_pokemon\.csv$/)
    );
  });
});
