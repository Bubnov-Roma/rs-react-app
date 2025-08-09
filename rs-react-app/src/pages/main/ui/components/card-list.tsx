import { DataListProps, PokemonList } from '@/shared/index';
import { Link, Outlet } from 'react-router-dom';
import style from './style.module.css';
import { useAppDispatch, useAppSelector } from '@/shared';
import {
  addPokemon,
  setPokemonError,
  setPokemonLoading,
  unselectedPokemon,
} from '@/features/pokemonSelection';
import { useLazyGetPokemonByNameQuery } from '@/features';
import { useRef } from 'react';
import { RefreshAllSelectedButton } from './refresh-all-selected-button';

export const CardList = ({
  data,
  currentPage,
  itemsPerPage,
}: DataListProps) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.pokemonSelection.selected);

  const [loadPokemon] = useLazyGetPokemonByNameQuery();

  const lastUnsubscribeRef = useRef<(() => void) | undefined>(undefined);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const isSelected = (name: string) => Boolean(selected[name]);

  const handleToggle = async (pokemon: PokemonList) => {
    const name = pokemon.name;

    if (isSelected(name)) {
      if (lastUnsubscribeRef.current) {
        lastUnsubscribeRef.current();
        lastUnsubscribeRef.current = undefined;
      }
      dispatch(unselectedPokemon(name));
    } else {
      if (lastUnsubscribeRef.current) {
        lastUnsubscribeRef.current();
        lastUnsubscribeRef.current = undefined;
      }

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
        lastUnsubscribeRef.current = null;
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.card_list}>
        <RefreshAllSelectedButton />
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
              <Link to={`/page/${currentPage}/${item.name}`}>
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
      <Outlet />
    </div>
  );
};
