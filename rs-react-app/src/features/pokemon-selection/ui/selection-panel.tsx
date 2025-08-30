'use client';

import { useAppDispatch, useAppSelector, useSnackbar } from '@/shared';
import { clearSelected } from '../model';
import style from './style.module.css';
import { RefreshAllSelectedButton } from './refresh-all-selected-button';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

export const SelectionPanel = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.pokemonSelection.selected);
  const { showSnackbar } = useSnackbar();
  const t = useTranslations('SelectionPanel');

  const selectedWithData = useMemo(
    () => Object.values(selected).filter((item) => item.data),
    [selected]
  );

  const handleDownload = async () => {
    const pokemon = selectedWithData.map((s) => s.data);
    if (pokemon.length === 0) return;

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        body: JSON.stringify({ pokemon }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        showSnackbar(`❌ ${t('downloadError')}`, true);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pokemon.length}_pokemon.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      showSnackbar(`✅ ${t('downloadSuccess', { count: pokemon.length })}`);
    } catch {
      showSnackbar(`❌ ${t('downloadError')}`, true);
    }
  };

  const isHidden = selectedWithData.length === 0;

  return (
    <div className={`${style.selection_panel} ${isHidden ? style.hidden : ''}`}>
      <div className={style.left}>
        {t('selected', { count: selectedWithData.length })}
      </div>
      <div className={style.right}>
        <RefreshAllSelectedButton />
        <button
          onClick={() => dispatch(clearSelected())}
          className="secondary-button"
        >
          {t('unselect')}
        </button>
        <button onClick={handleDownload} className="secondary-button">
          {t('download')}
        </button>
      </div>
    </div>
  );
};
