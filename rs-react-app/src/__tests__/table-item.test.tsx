import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableItem } from '../pages/main/ui/table-section/table-item';
import { PokemonType } from '@/shared';

describe('TableItem component test', () => {
  const pokemonProps: PokemonType = {
    name: 'Pikachu',
    sprites: { front_default: 'pikachu.png' },
    types: [{ type: { name: 'Electric' } }],
    height: '4',
    weight: '60',
    game_indices: [1, 2],
  };

  test('Renders information about a Pokemon', () => {
    render(
      <table>
        <tbody>
          <TableItem {...pokemonProps} />
        </tbody>
      </table>
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'pikachu.png');

    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    expect(screen.getByText('Type:', { exact: false })).toHaveTextContent(
      'Type:'
    );
    expect(screen.getByText('Electric')).toBeInTheDocument();

    expect(screen.getByText(`Height:`)).toHaveTextContent(`Height:`);
    expect(screen.getByText(`${pokemonProps.height}`)).toBeInTheDocument();

    expect(screen.getByText(`Weight:`)).toHaveTextContent(`Weight:`);
    expect(screen.getByText(`${pokemonProps.weight}`)).toBeInTheDocument();

    expect(
      screen.getByText(`${pokemonProps.game_indices.length}`)
    ).toBeInTheDocument();
  });
});
