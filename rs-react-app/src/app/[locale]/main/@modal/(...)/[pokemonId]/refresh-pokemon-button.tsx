'use client';

import { useAppDispatch, AsyncButton, useSnackbar } from '@/shared';
import {
  useLazyGetPokemonByNameQuery,
  pokemonApi,
  addPokemon,
  setPokemonError,
  setPokemonLoading,
} from '@/features';
import { useState } from 'react';
import style from './style.module.css';
import { useTranslations } from 'next-intl';

export const RefreshPokemonButton = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();
  const [loadPokemon] = useLazyGetPokemonByNameQuery();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showSnackbar } = useSnackbar();
  const t = useTranslations('RefreshPokemonButton');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    dispatch(pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: name }]));

    try {
      dispatch(setPokemonLoading({ name, loading: true }));
      const result = await loadPokemon(name).unwrap();
      dispatch(addPokemon(result));
      showSnackbar(t('success', { name }));
    } catch (error) {
      dispatch(
        setPokemonError({
          name,
          error: error?.data?.message || t('errorLoading'),
        })
      );
      showSnackbar(t('errorUpdating', { name }), true);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <AsyncButton
      onClick={handleRefresh}
      isLoading={isRefreshing}
      label={t('updateLabel', { name })}
      disabled={isRefreshing}
      progress={100}
      showProgress={true}
      className={style.refetch_button}
    />
  );
};
