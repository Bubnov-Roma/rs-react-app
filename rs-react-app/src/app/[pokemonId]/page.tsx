import ProvidersClient from '@/app/providers';
import PokemonClient from './pokemon-client';

// export async function generateStaticParams() {
//   const res = await fetch(
//     'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'
//   );
//   const data = await res.json();

//   return data.results.map((p: { name: string }) => ({
//     pokemonId: p.name,
//   }));
// }

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
