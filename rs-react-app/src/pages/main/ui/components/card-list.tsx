import { DataListProps, PokemonList } from '@/shared/index';
import { Link, Outlet } from 'react-router-dom';
import style from './style.module.css';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { useAppSelector } from '@/shared/hooks/use-app-selector';
import { fetchPokemon, unselectedPokemon } from '@/features';
export const CardList = ({
  data,
  currentPage,
  itemsPerPage,
}: DataListProps) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.pokemonSelection.selected);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const isSelected = (name: string) => Boolean(selected[name]);

  const handleToggle = (pokemon: PokemonList) => {
    if (isSelected(pokemon.name)) {
      dispatch(unselectedPokemon(pokemon.name));
    } else {
      dispatch(fetchPokemon(pokemon));
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.card_list}>
        {currentItems.map((item) => (
          <div key={item.name} className={style.card_item}>
            <input
              type="checkbox"
              checked={isSelected(item.name)}
              onChange={() => handleToggle(item)}
            />
            <Link to={`/page/${currentPage}/${item.name}`}>
              {item.name.toLocaleUpperCase()}
            </Link>
            {selected[item.name]?.loading && <span>Loading...</span>}
            {selected[item.name]?.error && (
              <span style={{ color: 'red' }}>{selected[item.name].error}</span>
            )}
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};
