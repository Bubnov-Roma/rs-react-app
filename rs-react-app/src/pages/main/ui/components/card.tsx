import { useNavigate } from 'react-router-dom';
import style from './style.module.css';
import { PageContext, type PokemonType } from '@/shared';
import { useContext } from 'react';

export const Card = (props: PokemonType) => {
  const { name, sprites, types, height, weight, game_indices } = props;
  const { numberPage, setNumberPage } = useContext(PageContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!numberPage) setNumberPage(1);
    navigate(`/page/${numberPage}`);
  };

  return (
    <div className={style.card_item}>
      <img
        src={sprites['front_default']}
        className={style.card_img}
        loading="lazy"
        decoding="async"
      ></img>
      <div className={style.card_name}>{name.toUpperCase()}</div>
      <div>
        <ul className={style.card_ul}>
          <li className={style.card_li}>
            <span className={style.card_span}>Type: </span>
            <span className={style.card_span}>{types[0]['type']['name']}</span>
          </li>
          <li className={style.card_li}>
            <span className={style.card_span}>Height: </span>
            <span className={style.card_span}> {height}</span>
          </li>
          <li className={style.card_li}>
            <span className={style.card_span}>Weight: </span>
            <span className={style.card_span}> {weight}</span>
          </li>
          <li className={style.card_li}>
            <span className={style.card_span}>Battle: </span>
            <span className={style.card_span}>{game_indices.length}</span>
          </li>
        </ul>
        <button className={style.close_button} onClick={handleClick}>
          Close
        </button>
      </div>
    </div>
  );
};
