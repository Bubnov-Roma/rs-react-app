import { useParams, useNavigate } from 'react-router-dom';
import { Card } from './card';
import { LoadingComponent } from '@/shared';
import { useEffect } from 'react';
import { useGetPokemonByNameQuery } from '@/features/pokemon-api/pokemon-api';

export const ProductDetail = () => {
  const { pokemonName } = useParams();
  const navigateTo = useNavigate();

  const { data, isLoading, isError } = useGetPokemonByNameQuery(
    pokemonName ?? '',
    {
      skip: !pokemonName,
    }
  );

  useEffect(() => {
    if (!pokemonName || isError) {
      navigateTo('/404');
    }
  }, [isError, navigateTo, pokemonName]);

  if (isLoading) return <LoadingComponent />;
  if (!data) return null;
  return <Card {...data} />;
};
