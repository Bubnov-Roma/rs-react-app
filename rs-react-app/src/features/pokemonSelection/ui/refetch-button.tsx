import { useContext } from 'react';
import { PageContext } from '@/shared';

export const RefetchButton = () => {
  const { refetch, isLoaded } = useContext(PageContext);

  return (
    <button onClick={() => refetch()} disabled={isLoaded}>
      🔁 Refresh button
    </button>
  );
};
