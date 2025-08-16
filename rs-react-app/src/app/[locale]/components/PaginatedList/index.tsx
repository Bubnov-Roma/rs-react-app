'use client';

import { Pagination } from '@/app/[locale]/components/Pagination';
import { useSearchParams } from 'next/navigation';
import { ensureSearchParams, isNumber, toArray } from '@/utils';
import styles from './style.module.css';
import { CardList } from '@/app/[locale]/components/CardList';
import { SearchInput } from '../Search';
import { useContext } from 'react';
import { PageContext } from '@/shared';

type Props = {
  itemsPerPage: number;
};

export default function PaginatedList({ itemsPerPage }: Props) {
  const searchParams = ensureSearchParams(useSearchParams());
  const currentPage = isNumber(searchParams.get('page'));
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('PageContext must be used inside PageContext.Provider');
  }
  const { pageContext } = context;

  return (
    <div className={styles.card_list_block}>
      <SearchInput />
      <div className={styles.wrapper}>
        <div className={styles.card_list}>
          <CardList
            data={pageContext ?? []}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
      <Pagination
        totalItems={toArray(pageContext).length}
        itemsPerPage={itemsPerPage}
        onPageChange={() => {}}
      />
    </div>
  );
}
