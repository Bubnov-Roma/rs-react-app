'use client';

import Card from './card';
import PageLoader from '@/app/[locale]/components/PageLoader';
import { useEffect } from 'react';
import { useGetPokemonByNameQuery } from '@/features/pokemon-api/pokemon-api';
import { useParams, useRouter } from 'next/navigation';
import NotFound from '@/app/[locale]/not-found';

export const Detail = () => {
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

  if (!pokemonName) return <NotFound />;
  if (isLoading) return <PageLoader />;
  if (!data) return null;
  return <Card {...data} />;
};
