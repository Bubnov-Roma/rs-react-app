'use client';

import { useAppDispatch, useAppSelector } from '@/shared';
import { clearSelected } from '../model';
import { saveAs } from 'file-saver';
import style from './style.module.css';
import { RefreshAllSelectedButton } from './refresh-all-selected-button';
import { useMemo } from 'react';

export const SelectionPanel = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.pokemonSelection.selected);

  const selectedWithData = useMemo(
    () => Object.values(selected).filter((item) => item.data),
    [selected]
  );

  const handleDownload = () => {
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

  const isHidden = selectedWithData.length === 0;

  return (
    <div className={`${style.selection_panel} ${isHidden ? style.hidden : ''}`}>
      <div className={style.left}>
        <strong>{selectedWithData.length}</strong> Pokémon selected
      </div>
      <div className={style.right}>
        <RefreshAllSelectedButton />
        <button
          onClick={() => dispatch(clearSelected())}
          className="secondary-button"
        >
          ❌ Unselect
        </button>
        <button onClick={handleDownload} className="secondary-button">
          📥 Download
        </button>
      </div>
    </div>
  );
};
