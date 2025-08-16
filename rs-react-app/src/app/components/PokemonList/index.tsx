'use client';

import { useGetAllPokemonQuery } from '@/features/pokemon-api/pokemon-api';

export default function PokemonList() {
  const { data, isLoading } = useGetAllPokemonQuery(undefined);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Pokemon List</h1>
      {data?.results?.map((p) => (
        <div key={p.name}>{p.name}</div>
      ))}
    </div>
  );
}
