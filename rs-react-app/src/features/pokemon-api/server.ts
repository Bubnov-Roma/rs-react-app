export async function getPokemonList() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000', {
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error('Failed to fetch pokemons');

  const data = await res.json();
  return data.results;
}
