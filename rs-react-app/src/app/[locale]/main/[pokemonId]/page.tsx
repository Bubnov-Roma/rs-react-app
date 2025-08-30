import { PageContextProvider } from '@/shared';
import { Detail } from '../@modal/(...)/[pokemonId]';
import PaginatedList from '../components/PaginatedList';

export default async function PokemonPage({
  params,
  searchParams,
}: {
  params: Promise<{ pokemonId: string }>;
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const { pokemonId } = await params;

  return (
    <PageContextProvider
      initialSearch={(await searchParams)?.search ?? ''}
      initialPage={
        (await searchParams)?.page ? Number((await searchParams).page) : 1
      }
    >
      <Detail pokemonId={pokemonId} />
    </PageContextProvider>
  );
}
