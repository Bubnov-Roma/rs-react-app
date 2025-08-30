'use client';

import { usePageContext, type PokemonType } from '@/shared';
import { useEffect } from 'react';
import { RefreshPokemonButton } from './refresh-pokemon-button';
import style from './style.module.css';
import { ensureSearchParams, isNumber } from '@/utils';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FallbackPokemon } from './fallback';

export default function Card(props: PokemonType) {
  const { name, sprites, types, height, weight, game_indices } = props;

  const {
    numberPage,
    setNumberPage,
    setStoredSearchValue,
    setIsDrawerOpen,
    storedSearchValue,
  } = usePageContext();

  useEffect(() => {
    setIsDrawerOpen(true);
    return () => setIsDrawerOpen(false);
  }, [setIsDrawerOpen]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = ensureSearchParams(useSearchParams());
  const t = useTranslations('Card');

  useEffect(() => {
    const pageParam = isNumber(searchParams.get('page'));
    if (pageParam) setNumberPage(pageParam);

    const searchValue = searchParams.get('search');
    if (searchValue) setStoredSearchValue(searchValue);
  }, [searchParams, setNumberPage, setStoredSearchValue]);

  const handleClose = () => {
    const query = new URLSearchParams();
    query.set('page', String(numberPage));
    if (storedSearchValue) query.set('search', storedSearchValue);

    const segments = pathname.split('/');
    const mainIndex = segments.indexOf('main');
    const basePath =
      mainIndex !== -1 ? segments.slice(0, mainIndex + 1).join('/') : pathname;

    router.push(`${basePath}?${query.toString()}`, { scroll: false });
  };

  return (
    <div className={style.drawer}>
      <button
        className={style.close_button}
        onClick={handleClose}
        aria-label={t('close')}
      >
        <span className={style.line}></span>
        <span className={style.line}></span>
      </button>
      <div className={style.card_content}>
        {sprites['front_default'] ? (
          <Image
            src={sprites['front_default']}
            alt={t('spriteAlt', { name })}
            width={96}
            height={96}
            priority
          />
        ) : (
          <FallbackPokemon width={96} height={96} className="text-gray-400" />
        )}
        <div className={style.card_name}>{name.toUpperCase()}</div>
        <ul className={style.card_ul}>
          <li className={style.card_li}>
            <span className={style.card_span}>{t('type')}: </span>
            <span className={style.card_span}>
              {t(`pokemonTypes.${types[0]['type']['name']}`)}
            </span>
          </li>
          <li className={style.card_li}>
            <span className={style.card_span}>{t('height')}: </span>
            <span className={style.card_span}>{height}</span>
          </li>
          <li className={style.card_li}>
            <span className={style.card_span}>{t('weight')}: </span>
            <span className={style.card_span}>{weight}</span>
          </li>
          <li className={style.card_li}>
            <span className={style.card_span}>{t('battle')}: </span>
            <span className={style.card_span}>{game_indices.length}</span>
          </li>
        </ul>
        <div style={{ display: 'flex', gap: '8px' }}>
          <RefreshPokemonButton name={name} />
        </div>
      </div>
    </div>
  );
}
