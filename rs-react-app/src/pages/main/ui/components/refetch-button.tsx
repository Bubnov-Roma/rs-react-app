import { useContext, useState } from 'react';
import { PageContext, AsyncButton, useSnackbar } from '@/shared';
import { useDispatch } from 'react-redux';
import { pokemonApi } from '@/features';

export const RefetchButton = () => {
  const dispatch = useDispatch();
  const { refetch, isLoaded } = useContext(PageContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleInvalidate = async () => {
    setIsRefreshing(true);
    try {
      dispatch(
        pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: 'LIST' }])
      );
      refetch();
      showSnackbar('✅ List refetched successfully');
    } catch (e) {
      showSnackbar('❌ Failed to refetch list', true);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <AsyncButton
      onClick={handleInvalidate}
      isLoading={isRefreshing}
      label="🗑️ Invalidate Cache & Refetch"
      disabled={isLoaded || isRefreshing}
      progress={100}
      showProgress={true}
    />
  );
};
