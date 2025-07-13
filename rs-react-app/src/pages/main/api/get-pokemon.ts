import type { FetchType, PokemonType } from '@/shared';

export const getPokemon = async (
  url: string
): Promise<FetchType | undefined | string> => {
  const pokemonUrl = url ?? 'https://pokeapi.co/api/v2/pokemon/';
  try {
    const response = await fetch(`${pokemonUrl}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: FetchType = await response.json();
    return data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) return error.message;
  }
};

export const fetchData = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: FetchType = await response.json();
    return data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) return error.message;
  }
};

export const getSearchPokemon = async (name: string) => {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
  try {
    const response = await fetch(`${pokemonUrl}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PokemonType = await response.json();
    return data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return error;
    }
  }
};
