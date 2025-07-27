import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotFoundPage } from '@/pages';
import { PageContext } from '@/shared';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('NotFoundPage', () => {
  const mockNavigate = jest.fn();
  const mockSetNumberPage = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
    mockSetNumberPage.mockClear();
  });

  const renderComponent = (numberPage: number | null) => {
    return render(
      <PageContext.Provider
        value={{ numberPage, setNumberPage: mockSetNumberPage }}
      >
        <NotFoundPage />
      </PageContext.Provider>
    );
  };

  it('renders 404 text and button', () => {
    renderComponent(2);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /to main page/i })
    ).toBeInTheDocument();
  });

  it('navigates to correct page when numberPage is present', () => {
    renderComponent(3);

    fireEvent.click(screen.getByRole('button', { name: /to main page/i }));

    expect(mockSetNumberPage).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/page/3');
  });

  it('sets numberPage to 1 and navigates when numberPage is null', () => {
    renderComponent(null);

    fireEvent.click(screen.getByRole('button', { name: /to main page/i }));

    expect(mockSetNumberPage).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith('/page/null');
  });
});
