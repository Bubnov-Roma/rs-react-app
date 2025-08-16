'use client';

import Link from 'next/link';
import style from './style.module.css';
import {
  useAppDispatch,
  useAppSelector,
  DataListProps,
  PokemonList,
} from '@/shared';
import {
  addPokemon,
  setPokemonError,
  setPokemonLoading,
  unselectedPokemon,
  useLazyGetPokemonByNameQuery,
} from '@/features';
import { useRef } from 'react';
import { RefetchButton } from './refetch-button';
import { useSearchParams } from 'next/navigation';
import { ensureSearchParams } from '@/utils';

export const CardList = ({
  data,
  currentPage,
  itemsPerPage,
}: DataListProps) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.pokemonSelection.selected);
  const [loadPokemon] = useLazyGetPokemonByNameQuery();
  const lastUnsubscribeRef = useRef<(() => void) | undefined>(undefined);
  const searchParams = ensureSearchParams(useSearchParams());
  const searchValue = searchParams.get('search') || '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const isSelected = (name: string) => Boolean(selected[name]);

  const handleToggle = async (pokemon: PokemonList) => {
    const name = pokemon.name;

    if (isSelected(name)) {
      lastUnsubscribeRef.current?.();
      dispatch(unselectedPokemon(name));
      return;
    }
    lastUnsubscribeRef.current?.();

    dispatch(setPokemonLoading({ name, loading: true }));
    const resultPromise = loadPokemon(name);

    if (resultPromise.unsubscribe) {
      lastUnsubscribeRef.current = resultPromise.unsubscribe;
    }

    try {
      const result = await resultPromise.unwrap();
      dispatch(addPokemon(result));
    } catch (error) {
      dispatch(
        setPokemonError({
          name,
          error: error?.data?.message || 'Error loading pokemon',
        })
      );
    } finally {
      lastUnsubscribeRef.current = undefined;
    }
  };

  return (
    <div className={style.card_list_block}>
      <RefetchButton />
      <div className={style.wrapper}>
        <div className={style.card_list}>
          {currentItems.map((item) => {
            const isLoading = selected[item.name]?.loading ?? false;
            const isError = Boolean(selected[item.name]?.error);
            return (
              <div key={item.name} className={style.card_item}>
                <input
                  type="checkbox"
                  checked={isSelected(item.name)}
                  onChange={() => handleToggle(item)}
                  disabled={isLoading}
                />
                <Link
                  href={`/${item.name}?page=${currentPage}${
                    searchValue ? `&search=${searchValue}` : ''
                  }`}
                >
                  {item.name.toLocaleUpperCase()}
                </Link>
                {isLoading && <span style={{ marginLeft: 8 }}>Loading...</span>}
                {isError && (
                  <span style={{ color: 'red', marginLeft: 8 }}>
                    {selected[item.name]?.error}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
