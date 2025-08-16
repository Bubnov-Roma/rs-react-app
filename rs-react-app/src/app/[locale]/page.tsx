import PaginatedList from './components/PaginatedList';

export default async function HomePage() {
  return <PaginatedList itemsPerPage={5} />;
}
