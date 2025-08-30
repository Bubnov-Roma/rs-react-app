import { getPokemonList } from '@/features/pokemon-api/server';
import { PageContextProvider } from '@/shared';
import PaginatedList from './components/PaginatedList';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pokemons = await getPokemonList();

  return (
    <PageContextProvider initialList={pokemons}>
      <PaginatedList />
      {children}
    </PageContextProvider>
  );
}
