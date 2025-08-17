'use client';

import { useSearchParams } from 'next/navigation';
import { ensureSearchParams, isNumber } from '@/utils';
import styles from './style.module.css';
import { CardList } from '@/app/[locale]/components/CardList';
import { SearchInput } from '../Search';
import { useContext, useEffect, useState } from 'react';
import { PageContext } from '@/shared';
import { SelectionPanel } from '@/features';
import { useTranslations } from 'next-intl';

type Props = {
  itemsPerPage: number;
};

export default function PaginatedList({ itemsPerPage }: Props) {
  const t = useTranslations('PaginatedList');

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const searchParams = ensureSearchParams(useSearchParams());
  const currentPage = isNumber(searchParams.get('page'));

  const context = useContext(PageContext);
  if (!context) {
    throw new Error('PageContext must be used inside PageContext.Provider');
  }
  const { pageContext } = context;

  const isEmpty = mounted && pageContext?.length === 0;

  return (
    <div className={styles.card_list_block}>
      <SearchInput />
      <div className={styles.wrapper}>
        {isEmpty ? (
          <div className={styles.empty}>
            <div className={styles.notFoundBox}>
              <img
                src="/assets/img/pikachu-search.gif"
                alt="Pikachu looking for Pokemon"
                className={styles.pikachu}
              />
              <h4>{t('notFound')}</h4>
            </div>
          </div>
        ) : (
          <div className={styles.card_list}>
            <CardList
              data={pageContext ?? []}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </div>
      <SelectionPanel />
    </div>
  );
}
