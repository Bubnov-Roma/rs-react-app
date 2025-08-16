import { pokemonApi } from '@/features';
import { wrapper } from '.';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(
      pokemonApi.endpoints.getAllPokemon.initiate(undefined)
    );
    return { props: {} };
  }
);
