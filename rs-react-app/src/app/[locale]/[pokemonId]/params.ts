import { pokemonApi } from '@/features';
import { makeStore } from '@/app/store/store';

export async function generateStaticParams() {
  const store = makeStore();
  const result = await store.dispatch(
    pokemonApi.endpoints.getAllPokemon.initiate(undefined)
  );

  const data = result.data;
  if (!data) return [];

  return data.results.map((pokemon: { name: string }) => ({
    pokemonId: pokemon.name,
  }));
}
