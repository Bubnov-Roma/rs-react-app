'use client';

import PaginatedList from '@/app/components/PaginatedList';

export default function HomeClient() {
  return <PaginatedList itemsPerPage={5} />;
}
