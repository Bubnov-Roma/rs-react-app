import React from 'react';
import style from './style.module.css';
import type { PokemonType } from '@/shared';

export class TableItem extends React.Component<PokemonType> {
  render() {
    const { name, sprites, types, height, weight, game_indices } = this.props;
    return (
      <>
        <td className={style.card_name}>
          <img src={sprites['front_default']} />
          {name}
        </td>
        <td>
          <ul>
            <li className="cardBlock">
              <span className="cardCell">Type: </span>
              <span className="cardCell">{types[0]['type']['name']}</span>
            </li>
            <li className="cardBlock">
              <span className="cardCell">Height: </span>
              <span className="cardCell"> {height}</span>
            </li>
            <li className="cardBlock">
              <span className="cardCell">Weight: </span>
              <span className="cardCell"> {weight}</span>
            </li>
            <li className="cardBlock">
              <span className="cardCell">Number of Battle: </span>
              <span className="cardCell">{game_indices.length}</span>
            </li>
          </ul>
        </td>
      </>
    );
  }
}
