import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '@/pages/main/ui/components';
import { PageContext } from '@/shared';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

jest.mock('@/shared', () => {
  const original = jest.requireActual('@/shared');
  return {
    ...original,
    useStorage: (key: string) => {
      const store = {
        storageValue: '',
        page: 1,
      };
      return [store[key], jest.fn()];
    },
  };
});

describe('SearchInput', () => {
  const mockSetStateIsLoading = jest.fn();
  const mockFiltered = jest.fn();
  const mockSetNumberPage = jest.fn();

  const renderWithContext = () => {
    return render(
      <PageContext.Provider
        value={{
          Filtered: mockFiltered,
          numberPage: 1,
          setNumberPage: mockSetNumberPage,
          pageContext: [],
        }}
      >
        <MemoryRouter>
          <SearchInput
            setStateIsLoading={mockSetStateIsLoading}
            stateIsLoading={false}
          />
        </MemoryRouter>
      </PageContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and button', () => {
    renderWithContext();

    expect(
      screen.getByPlaceholderText(/Enter Name Pokemon/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('handles input change', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText(/Enter Name Pokemon/i);

    fireEvent.change(input, { target: { value: 'bulbasaur' } });

    expect((input as HTMLInputElement).value).toBe('bulbasaur');
  });

  it('submits the form and calls handlers', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText(/Enter Name Pokemon/i);
    const button = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    expect(mockSetStateIsLoading).toHaveBeenCalledTimes(2);
    expect(mockFiltered).toHaveBeenCalledWith('pikachu');
    expect(mockSetNumberPage).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith('/page/1', { replace: true });
  });
});
