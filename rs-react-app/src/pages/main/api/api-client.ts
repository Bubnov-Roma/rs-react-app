import type { FetchType, PokemonType } from '@/shared';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const LIMIT_1e_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return error;
    }
  }
};

export const getOnePokemon = async (name: string) => {
  const data: PokemonType | Error = await fetchData(`${BASE_URL}${name}`);
  return data instanceof Error ? data : data;
};

export const getAllPokemon = async () => {
  const data: FetchType = await fetchData(`${LIMIT_1e_URL}`);
  return data;
};
