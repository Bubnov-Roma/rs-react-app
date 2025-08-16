'use client';

import PaginatedList from '@/app/[locale]/components/PaginatedList';

export default function HomeClient() {
  return <PaginatedList itemsPerPage={5} />;
}
