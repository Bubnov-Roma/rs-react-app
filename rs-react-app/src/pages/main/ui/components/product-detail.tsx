'use client';

import { Card } from './card';
import { LoadingComponent } from '@/shared';
import { useEffect } from 'react';
import { useGetPokemonByNameQuery } from '@/features/pokemon-api/pokemon-api';
import { useParams, useRouter } from 'next/navigation';

export const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const pokemonName = params?.pokemonId as string | undefined;

  const { data, isLoading, isError } = useGetPokemonByNameQuery(
    pokemonName ?? '',
    {
      skip: !pokemonName,
    }
  );

  useEffect(() => {
    if (!pokemonName || isError) {
      router.replace('/not-found');
    }
  }, [isError, router, pokemonName]);

  if (!pokemonName) return null;
  if (isLoading) return <LoadingComponent />;
  if (!data) return null;
  return <Card {...data} />;
};
