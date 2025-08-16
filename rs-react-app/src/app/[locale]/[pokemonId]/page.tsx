import ProvidersClient from '@/app/providers';
import PokemonClient from './pokemon-client';

export default async function PokemonPage({
  params,
}: {
  params: { pokemonId: string };
}) {
  const { pokemonId } = await params;

  return (
    <ProvidersClient>
      <PokemonClient pokemonId={pokemonId} />
    </ProvidersClient>
  );
}
