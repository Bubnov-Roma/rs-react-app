import { useContext } from 'react';
import { PageContext } from '@/shared';
import { useDispatch } from 'react-redux';
import { pokemonApi } from '@/features';

export const RefetchButton = () => {
  const dispatch = useDispatch();
  const { refetch, isLoaded } = useContext(PageContext);

  const handleInvalidate = () => {
    dispatch(pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: 'LIST' }]));
    refetch();
  };

  return (
    <button onClick={handleInvalidate} disabled={isLoaded}>
      🗑️ Invalidate Cache & Refetch
    </button>
  );
};
