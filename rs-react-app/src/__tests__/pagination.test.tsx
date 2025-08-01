import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/pages/main/ui/components/pagination';
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
  const originalModule = jest.requireActual('@/shared');
  return {
    ...originalModule,
    useStorage: () => [1, jest.fn()],
  };
});

describe('Pagination component', () => {
  const mockOnPageChange = jest.fn();
  const mockSetNumberPage = jest.fn();

  const renderComponent = (pageValue = 1) => {
    render(
      <PageContext.Provider
        value={{
          numberPage: pageValue,
          setNumberPage: mockSetNumberPage,
        }}
      >
        <MemoryRouter>
          <Pagination
            totalItems={10}
            itemsPerPage={5}
            onPageChange={mockOnPageChange}
          />
        </MemoryRouter>
      </PageContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and buttons', () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/rom 1 to 2/i)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('shows error for non-numeric input', () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/rom 1 to/i);
    fireEvent.change(input, { target: { value: 'abc' } });

    expect(
      screen.getByText(/Only numeric values are allowed/i)
    ).toBeInTheDocument();
  });

  it('shows error for number out of range', () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/rom 1 to/i);
    fireEvent.change(input, { target: { value: '10' } });

    expect(screen.getByText(/Enter a number from 1 to 2/i)).toBeInTheDocument();
  });

  it('submits valid page number', () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/rom 1 to/i);
    const button = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('?page=2', { replace: true });
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
    expect(mockSetNumberPage).toHaveBeenCalledWith(2);
  });

  it('Prev and Next buttons work', () => {
    renderComponent(2);

    const prevBtn = screen.getByText('Prev');
    const nextBtn = screen.getByText('Next');

    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).toBeDisabled();

    fireEvent.click(prevBtn);
    expect(mockNavigate).toHaveBeenCalledWith('?page=1', { replace: true });
  });
});
