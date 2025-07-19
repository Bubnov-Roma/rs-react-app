import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../pages/main/ui/';

jest.mock('@/shared', () => ({
  getStorage: jest.fn(),
  setStorage: jest.fn(),
  type: jest.requireActual('@/shared').type,
}));

import { getStorage, setStorage } from '@/shared';

describe('SearchInput component tests', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize the value from getStorage and call onSearch when mounted', () => {
    (getStorage as jest.Mock).mockReturnValue('Bulbasaur');

    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(
      'Enter Name Pokemon'
    ) as HTMLInputElement;
    expect(input.value).toBe('Bulbasaur');

    expect(mockOnSearch).toHaveBeenCalledWith('Bulbasaur');
  });

  test('updates state when text is entered', () => {
    (getStorage as jest.Mock).mockReturnValue('');
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(
      'Enter Name Pokemon'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Charmander' } });
    expect(input.value).toBe('Charmander');
  });

  test('when submitting, calls setStorage and onSearch with the current value', () => {
    (getStorage as jest.Mock).mockReturnValue('');
    render(<SearchInput onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(
      'Enter Name Pokemon'
    ) as HTMLInputElement;
    const button = screen.getByText('Search') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'Pikachu' } });

    fireEvent.click(button);

    expect(setStorage).toHaveBeenCalledWith('Pikachu');
    expect(mockOnSearch).toHaveBeenCalledWith('Pikachu');
  });
});
