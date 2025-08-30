'use client';

import Card from './card';
import PageLoader from '@/app/[locale]/main/components/PageLoader';
import { useEffect } from 'react';
import { useGetPokemonByNameQuery } from '@/features/pokemon-api/pokemon-api';
import { useRouter } from 'next/navigation';
import NotFound from '@/app/[locale]/not-found';

export const Detail = ({ pokemonId }: { pokemonId: string }) => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetPokemonByNameQuery(
    pokemonId ?? '',
    {
      skip: !pokemonId,
    }
  );

  useEffect(() => {
    if (!pokemonId || isError) {
      router.replace('/not-found');
    }
  }, [isError, router, pokemonId]);

  if (!pokemonId) return <NotFound />;
  if (isLoading) return <PageLoader />;
  if (!data) return null;
  return <Card {...data} />;
};
