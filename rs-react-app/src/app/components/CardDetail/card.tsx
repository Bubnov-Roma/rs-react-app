'use client';

import { PageContext, type PokemonType } from '@/shared';
import { useContext, useEffect } from 'react';
import { RefreshPokemonButton } from './refresh-pokemon-button';
import style from './style.module.css';
import { ensureSearchParams, isNumber } from '@/utils';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Card(props: PokemonType) {
  const { name, sprites, types, height, weight, game_indices } = props;
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('PageContext must be used inside PageContext.Provider');
  }
  const { numberPage, setNumberPage, setStoredSearchValue } = context;

  const router = useRouter();
  const searchParams = ensureSearchParams(useSearchParams());

  useEffect(() => {
    const pageParam = isNumber(searchParams.get('page'));
    if (pageParam) setNumberPage(pageParam);

    const searchValue = searchParams.get('search');
    if (searchValue) setStoredSearchValue(searchValue);
  }, [searchParams, setNumberPage, setStoredSearchValue]);

  const handleClick = () => {
    const page = isNumber(numberPage);
    setNumberPage(page);

    const searchValue = searchParams.get('search');
    const query = new URLSearchParams();
    query.set('page', String(page));
    if (searchValue) query.set('search', searchValue);

    router.push(`/?${query.toString()}`);
  };

  return (
    <div className={style.card}>
      <button
        className={style.close_button}
        onClick={handleClick}
        aria-label="Close card"
      >
        ×
      </button>
      <Image
        src={sprites['front_default']}
        alt={`${name} sprite`}
        width={96}
        height={96}
        priority
      />
      <div className={style.card_name}>{name.toUpperCase()}</div>
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
      <div style={{ display: 'flex', gap: '8px' }}>
        <RefreshPokemonButton name={name} />
      </div>
    </div>
  );
}
