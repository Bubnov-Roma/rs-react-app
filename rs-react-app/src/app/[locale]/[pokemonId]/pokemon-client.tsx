'use client';

import PaginatedList from '@/app/[locale]/components/PaginatedList';
import { useGetPokemonByNameQuery } from '@/features';
import { Detail } from '@/app/[locale]/[pokemonId]/CardDetail';
import { notFound } from 'next/navigation';
import PageLoader from '../components/PageLoader';

export default function PokemonClient({ pokemonId }: { pokemonId: string }) {
  const { data: pokemon, isLoading: cardLoading } =
    useGetPokemonByNameQuery(pokemonId);

  if (cardLoading && !pokemon) {
    return <PageLoader />;
  }

  return (
    <div>
      <PaginatedList itemsPerPage={5} />
      {pokemon ? <Detail /> : notFound()}
    </div>
  );
}
