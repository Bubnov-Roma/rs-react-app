import { FetchType, PokemonType } from '@/shared';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getAllPokemon: builder.query<FetchType, undefined>({
      query: () => 'pokemon?limit=100000&offset=0',
      providesTags: ['Pokemon'],
    }),
    getPokemonByName: builder.query<PokemonType, string>({
      query: (name) => `pokemon/${name}`,
      providesTags: (result, error, name) => [{ type: 'Pokemon', id: name }],
    }),
  }),
});

export const {
  useGetAllPokemonQuery,
  useGetPokemonByNameQuery,
  useLazyGetAllPokemonQuery,
  useLazyGetPokemonByNameQuery,
} = pokemonApi;
