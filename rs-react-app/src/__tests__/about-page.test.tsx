import { render, screen, fireEvent } from '@testing-library/react';
import { AboutPage } from '@/pages';
import { PageContext } from '@/shared';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('AboutPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and content', () => {
    render(
      <PageContext.Provider value={{ numberPage: 3, setNumberPage: jest.fn() }}>
        <AboutPage />
      </PageContext.Provider>
    );

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText(/My name is Roma Bubnov/i)).toBeInTheDocument();
  });

  it('navigates to the correct page on button click', () => {
    render(
      <PageContext.Provider value={{ numberPage: 3, setNumberPage: jest.fn() }}>
        <AboutPage />
      </PageContext.Provider>
    );

    const button = screen.getByRole('button', { name: /Main/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/page/3', { replace: true });
  });
});
