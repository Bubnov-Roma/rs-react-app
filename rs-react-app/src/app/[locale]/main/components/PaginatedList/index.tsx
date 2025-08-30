'use client';

import { useEffect, useState } from 'react';
import { usePageContext } from '@/shared';
import styles from './style.module.css';
import { List } from '@/app/[locale]/main/components/List';
import { SearchInput } from '../Search';
import { SelectionPanel } from '@/features';
import { useTranslations } from 'next-intl';

export default function PaginatedList() {
  const t = useTranslations('PaginatedList');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { pageContext } = usePageContext();

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
            <List />
          </div>
        )}
      </div>
      <SelectionPanel />
    </div>
  );
}
