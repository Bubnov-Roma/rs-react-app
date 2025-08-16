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

export const RefreshPokemonButton = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();
  const [loadPokemon] = useLazyGetPokemonByNameQuery();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    dispatch(pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: name }]));

    try {
      dispatch(setPokemonLoading({ name, loading: true }));
      const result = await loadPokemon(name).unwrap();
      dispatch(addPokemon(result));
      showSnackbar(`✅ ${name} success updated`);
    } catch (error) {
      dispatch(
        setPokemonError({
          name,
          error: error?.data?.message || 'Error loading',
        })
      );
      showSnackbar(`❌ Error updating ${name}`, true);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <AsyncButton
      onClick={handleRefresh}
      isLoading={isRefreshing}
      label={`🔁 Update ${name}`}
      disabled={isRefreshing}
      progress={100}
      showProgress={true}
      className={`${style.refetch_button}`}
    />
  );
};
