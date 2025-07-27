import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from './card';
import { getOnePokemon } from '../../api';
import { LoadingComponent } from '@/shared';

export const ProductDetail = () => {
  const { pokemonName } = useParams();
  const navigateTo = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!pokemonName) {
      void navigateTo('/404');
      setIsLoading(false);
      return;
    }
    const receiveData = async (): Promise<void> => {
      setIsLoading(true);
      setItem(null);
      const productData = await getOnePokemon(pokemonName);
      if (productData) {
        setItem(productData);
      } else {
        void navigateTo('/404');
      }
      setIsLoading(false);
    };
    void receiveData();
  }, [pokemonName, navigateTo]);

  return <>{isLoading ? <LoadingComponent /> : <Card {...item} />}</>;
};
