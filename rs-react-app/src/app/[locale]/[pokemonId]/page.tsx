import PokemonClient from './pokemon-client';

export default async function PokemonPage({
  params,
}: {
  params: { pokemonId: string };
}) {
  const { pokemonId } = await params;

  return <PokemonClient pokemonId={pokemonId} />;
}
