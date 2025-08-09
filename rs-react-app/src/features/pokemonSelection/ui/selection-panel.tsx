import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { useAppSelector } from '@/shared/hooks/use-app-selector';
import { clearSelected } from '../model';
import { saveAs } from 'file-saver';
import style from './style.module.css';

export const SelectionPanel = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.pokemonSelection.selected);

  const selectedWithData = Object.values(selected).filter((item) => item.data);
  if (selectedWithData.length === 0) return null;

  const handleDownload = () => {
    const selectedWithData = Object.values(selected).filter(
      (item) => item.data
    );

    if (selectedWithData.length === 0) return;

    const pokemon = selectedWithData.map((item) => item.data);

    const headers = Object.keys(pokemon[0]);
    const rows = pokemon.map((p) =>
      headers.map((h) => JSON.stringify(p[h] ?? '')).join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');

    const filename = `${pokemon.length}_pokemon.csv`;

    const blob = new Blob(['\ufeff', csvContent], {
      type: 'data:text/csv; charset=utf-8,',
    });
    saveAs(blob, filename);
  };

  return (
    <div className={style.selection_panel}>
      <div style={{ marginTop: '8px' }}>
        <button onClick={() => dispatch(clearSelected())}>Unselect all</button>
        <button onClick={handleDownload} style={{ marginLeft: '8px' }}>
          Download
        </button>
      </div>
      <strong>{selectedWithData.length}</strong> Pokémon selected
    </div>
  );
};
