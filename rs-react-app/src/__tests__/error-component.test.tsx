import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorComponent } from '../pages/main/ui/components-section';

describe('Error component test', () => {
  const message = 'Generate Error';

  test('displays the message and applies correct classes', () => {
    render(<ErrorComponent message={message} />);

    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();

    expect(messageElement.tagName).toBe('H1');
    expect(messageElement).toHaveClass('message');

    const containerDiv = messageElement.closest('div');
    expect(containerDiv).toHaveClass('error');
  });
});
