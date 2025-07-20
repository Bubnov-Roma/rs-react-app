import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table } from '../pages/main/ui/table-section';

jest.mock('../pages/main/ui/table-section/table-item.tsx', () => ({
  TableItem: ({ name }: { name: string }) => (
    <tr data-testid="table-item">
      <td>{name}</td>
    </tr>
  ),
}));

describe('Table component test', () => {
  const sampleData = [
    {
      name: 'Pikachu',
      sprites: { front_default: 'pikachu.png' },
      types: [{ type: { name: 'Electric' } }],
      height: '4',
      weight: '60',
      game_indices: [1, 2],
    },
    {
      name: 'Bulbasaur',
      sprites: { front_default: 'bulbasaur.png' },
      types: [{ type: { name: 'Grass' } }],
      height: '7',
      weight: '69',
      game_indices: [3],
    },
  ];

  test('Renders a table with data', () => {
    render(<Table data={sampleData} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();

    const items = screen.getAllByTestId('table-item');
    expect(items).toHaveLength(sampleData.length);

    expect(items[0]).toHaveTextContent('Pikachu');
  });
});
