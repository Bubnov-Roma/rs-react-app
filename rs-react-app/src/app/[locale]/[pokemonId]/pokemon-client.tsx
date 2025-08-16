'use client';

import PaginatedList from '@/app/[locale]/components/PaginatedList';
import { useGetPokemonByNameQuery } from '@/features';
import { LoadingComponent } from '@/shared';
import Card from '@/app/[locale]/components/CardDetail/card';

export default function PokemonClient({ pokemonId }: { pokemonId: string }) {
  const { data: pokemon, isLoading: cardLoading } =
    useGetPokemonByNameQuery(pokemonId);

  if (cardLoading && !pokemon) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <PaginatedList itemsPerPage={5} />
      {pokemon ? <Card {...pokemon} /> : null}
    </div>
  );
}
