import { renderWithProviders } from '../utils';
import { screen, fireEvent } from '@testing-library/react';
import { SelectionPanel } from '@/features';
import { PokemonType, RootState } from '@/shared';
import { saveAs } from 'file-saver';
import { PersistState } from 'redux-persist';

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

jest.mock('@/shared/hooks/use-app-selector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('@/shared/hooks/use-app-dispatch', () => ({
  useAppDispatch: jest.fn(),
}));

import { useAppSelector } from '@/shared/hooks/use-app-selector';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';

const mockPokemon: PokemonType = {
  name: 'bulbasaur',
  height: '7',
  weight: '69',
  sprites: { front_default: 'img.png' },
  types: [{ type: { name: 'grass' } }],
  game_indices: [],
};

const mockPersistState: PersistState = {
  version: 1,
  rehydrated: true,
};

describe('SelectionPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render when Pokémon with data exists', () => {
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: RootState) => unknown) =>
        selector({
          pokemonSelection: {
            selected: {
              bulbasaur: { loading: false, data: mockPokemon },
            },
            _persist: mockPersistState,
          },
        } as unknown as RootState)
    );

    const { container } = renderWithProviders(<SelectionPanel />);
    expect(screen.getByText(/❌ Unselect/i)).toBeInTheDocument();
    expect(screen.getByText(/📥 Download/i)).toBeInTheDocument();
    expect(container.textContent).toContain('1 Pokémon selected');
  });

  it('should call dispatch(clearSelected) when "Unselect" is clicked', () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: RootState) => unknown) =>
        selector({
          pokemonSelection: {
            selected: {
              bulbasaur: { loading: false, data: mockPokemon },
            },
            _persist: mockPersistState,
          },
        } as unknown as RootState)
    );

    renderWithProviders(<SelectionPanel />);
    fireEvent.click(screen.getByText(/❌ Unselect/i));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'pokemonSelection/clearSelected' })
    );
  });

  it('should trigger CSV download when "Download" is clicked', () => {
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: RootState) => unknown) =>
        selector({
          pokemonSelection: {
            selected: {
              bulbasaur: { loading: false, data: mockPokemon },
            },
            _persist: mockPersistState,
          },
        } as unknown as RootState)
    );

    renderWithProviders(<SelectionPanel />);
    fireEvent.click(screen.getByText(/📥 Download/i));

    expect(saveAs).toHaveBeenCalledTimes(1);
    expect(saveAs).toHaveBeenCalledWith(
      expect.any(Blob),
      expect.stringMatching(/_pokemon\.csv$/)
    );
  });

  it('should not trigger download if no Pokémon has data', () => {
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: RootState) => unknown) =>
        selector({
          pokemonSelection: {
            selected: {
              pikachu: { loading: false, data: undefined },
            },
            _persist: mockPersistState,
          },
        } as unknown as RootState)
    );

    renderWithProviders(<SelectionPanel />);
    fireEvent.click(screen.getByText(/📥 Download/i));

    expect(saveAs).not.toHaveBeenCalled();
  });
});
