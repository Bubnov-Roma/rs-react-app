'use client';

import {
  AsyncButton,
  useAppDispatch,
  useAppSelector,
  useSnackbar,
} from '@/shared';
import { useLazyGetPokemonByNameQuery, pokemonApi } from '@/features';
import { addPokemon, setPokemonError, setPokemonLoading } from '@/features';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import style from './style.module.css';

export const RefreshAllSelectedButton = () => {
  const t = useTranslations('RefreshAllSelectedButton');
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.pokemonSelection.selected);
  const [loadPokemon] = useLazyGetPokemonByNameQuery();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { showSnackbar } = useSnackbar();

  const handleRefreshAll = async () => {
    const names = Object.keys(selected);
    if (names.length === 0) return;

    setIsRefreshing(true);
    setProgress(0);

    const successList: string[] = [];
    const errorList: string[] = [];

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      try {
        dispatch(
          pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: name }])
        );
        dispatch(setPokemonLoading({ name, loading: true }));
        const result = await loadPokemon(name).unwrap();
        dispatch(addPokemon(result));
        successList.push(name);
      } catch (error) {
        dispatch(
          setPokemonError({
            name,
            error: error?.data?.message || t('errorUpdate'),
          })
        );
        errorList.push(name);
      }
      setProgress(Math.round(((i + 1) / names.length) * 100));
    }

    let msg = '';
    if (successList.length)
      msg += `✅ ${t('updated')}: ${successList.join(', ')}`;
    if (errorList.length) msg += ` ❌ ${t('errors')}: ${errorList.join(', ')}`;

    showSnackbar(msg, errorList.length > 0);

    setIsRefreshing(false);
  };

  const isDisabled = Object.keys(selected).length === 0 || isRefreshing;

  return (
    <AsyncButton
      onClick={handleRefreshAll}
      isLoading={isRefreshing}
      label={`🔁 ${t('update')}`}
      disabled={isDisabled || isRefreshing}
      progress={progress}
      showProgress={true}
      className={`${style.refresh_button}`}
    />
  );
};
