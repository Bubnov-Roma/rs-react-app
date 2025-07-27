import React from 'react';
import { render } from '@testing-library/react';
import style from '../pages/main/ui/components-section/style.module.css';
import { LoadingComponent } from '@/shared';

describe('Loading component test', () => {
  it('Displaying loading with correct classes', () => {
    render(<LoadingComponent />);

    const containerDiv = document.querySelector(`.${style.spinner_container}`);
    const spinnerDiv = document.querySelector(`.${style.spinner}`);

    expect(containerDiv).toBeInTheDocument();
    expect(spinnerDiv).toBeInTheDocument();

    expect(containerDiv).toHaveClass(style.spinner_container);
    expect(spinnerDiv).toHaveClass(style.spinner);
  });
});
