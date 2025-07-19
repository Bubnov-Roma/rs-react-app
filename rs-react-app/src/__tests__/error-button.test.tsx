import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ErrorButton } from '../pages/main/ui/buttons-section';

describe('ErrorButton tests', () => {
  test('calls onError when clicking on the "Error Button"', () => {
    const mockOnError = jest.fn();

    const { getByText } = render(<ErrorButton onError={mockOnError} />);

    const button = getByText('Error Button');

    jest.spyOn(console, 'error').mockImplementation(() => {});

    fireEvent.click(button);

    expect(mockOnError).toHaveBeenCalledTimes(1);

    const errorArg = mockOnError.mock.calls[0][0];
    expect(errorArg).toBeInstanceOf(Error);
    expect(errorArg.message).toBe('Generated Error!');

    (console.error as jest.Mock).mockRestore();
  });
});
