'use client';

import { Link } from '@/navigation';
import style from './style.module.css';
import {
  useAppDispatch,
  useAppSelector,
  PokemonList,
  usePageContext,
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
import { Pagination } from '../Pagination';

export const List = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.pokemonSelection.selected);
  const [loadPokemon] = useLazyGetPokemonByNameQuery();
  const lastUnsubscribeRef = useRef<(() => void) | undefined>(undefined);

  const context = usePageContext();
  const { pageContext, numberPage, storedSearchValue } = context;

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
    <div
      className={`${style.card_list_block} ${
        context.isDrawerOpen ? style.left_align : style.center_align
      }`}
    >
      <RefetchButton />
      <div
        className={`${style.wrapper} ${
          context.isDrawerOpen ? style.left_align : style.wrapper
        }`}
      >
        <div className={style.card_list}>
          {pageContext.map((item) => {
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
                  href={{
                    pathname: `/main/${item.name}`,
                    query: {
                      page: numberPage,
                      ...(storedSearchValue
                        ? { search: storedSearchValue }
                        : {}),
                    },
                  }}
                  scroll={false}
                >
                  {item.name.toLocaleUpperCase()}
                </Link>
                {isLoading && <span style={{ marginLeft: 8 }}>Loading...</span>}
                {isError && (
                  <span style={{ color: 'red', marginLeft: 8 }}>❌</span>
                )}
              </div>
            );
          })}
        </div>
        <Pagination />
      </div>
    </div>
  );
};
