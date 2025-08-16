export async function fetchPokemonList(limit = 20, offset = 0) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) throw new Error('Failed to fetch Pokémon list');
  return res.json();
}

export async function fetchPokemonByName(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error(`Pokémon ${name} not found`);
  return res.json();
}
