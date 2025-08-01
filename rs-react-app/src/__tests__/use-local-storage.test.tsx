import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useStorage } from '@/shared';

type TestComponentProps = {
  storageKey: string;
  initial: string;
};

const TestComponent = ({ storageKey, initial }: TestComponentProps) => {
  const [value, setValue] = useStorage(storageKey, initial);

  return (
    <div>
      <div>Current: {value}</div>
      <button onClick={() => setValue('updated')}>Update</button>
    </div>
  );
};

describe('useStorage', () => {
  const storageKey = 'testKey';

  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value if nothing in localStorage', () => {
    render(<TestComponent storageKey={storageKey} initial="default" />);
    expect(screen.getByText(/Current: default/i)).toBeInTheDocument();
  });

  it('reads value from localStorage if present', () => {
    localStorage.setItem(storageKey, JSON.stringify('stored'));
    render(<TestComponent storageKey={storageKey} initial="default" />);
    expect(screen.getByText(/Current: stored/i)).toBeInTheDocument();
  });

  it('updates localStorage when value changes', () => {
    render(<TestComponent storageKey={storageKey} initial="default" />);
    fireEvent.click(screen.getByText(/update/i));

    expect(screen.getByText(/Current: updated/i)).toBeInTheDocument();

    const stored = localStorage.getItem(storageKey);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored as string)).toBe('updated');
  });
});
