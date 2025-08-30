'use client';

import { useContext, useState } from 'react';
import { PageContext, AsyncButton, useSnackbar } from '@/shared';
import { useDispatch } from 'react-redux';
import { pokemonApi } from '@/features';
import { useTranslations } from 'next-intl';

export const RefetchButton = () => {
  const dispatch = useDispatch();
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('PageContext must be used inside PageContext.Provider');
  }
  const { refetch, isLoading } = context;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showSnackbar } = useSnackbar();
  const t = useTranslations('RefetchButton');

  const handleInvalidate = async () => {
    setIsRefreshing(true);
    try {
      dispatch(pokemonApi.util.resetApiState());
      refetch();
      showSnackbar(t('success'));
    } catch {
      showSnackbar(t('error'), true);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <AsyncButton
      onClick={handleInvalidate}
      isLoading={isRefreshing}
      label={t('label')}
      disabled={isLoading || isRefreshing}
      progress={100}
      showProgress={true}
    />
  );
};
