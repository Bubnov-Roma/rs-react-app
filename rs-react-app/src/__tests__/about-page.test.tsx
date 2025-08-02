import { render, screen } from '@testing-library/react';
import { AboutPage } from '@/pages';

describe('AboutPage', () => {
  it('renders title and content', () => {
    render(<AboutPage />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(
      screen.getByText(/Hello\. My name is Roma Bubnov\./i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/I graduated from the Saratov State Conservatory/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/React.*focus further development/i)
    ).toBeInTheDocument();
  });

  it('renders external RS School link', () => {
    render(<AboutPage />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
