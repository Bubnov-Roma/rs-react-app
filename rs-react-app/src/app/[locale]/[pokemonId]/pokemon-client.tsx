'use client';

import PaginatedList from '@/app/[locale]/components/PaginatedList';
import { useGetPokemonByNameQuery } from '@/features';
import { LoadingComponent } from '@/shared';
import { Detail } from '@/app/[locale]/[pokemonId]/CardDetail';
import { notFound } from 'next/navigation';

export default function PokemonClient({ pokemonId }: { pokemonId: string }) {
  const { data: pokemon, isLoading: cardLoading } =
    useGetPokemonByNameQuery(pokemonId);

  if (cardLoading && !pokemon) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <PaginatedList itemsPerPage={5} />
      {pokemon ? <Detail /> : notFound()}
    </div>
  );
}
