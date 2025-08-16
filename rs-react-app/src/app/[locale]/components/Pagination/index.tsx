'use client';

import { ChangeEvent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ensureSearchParams, isNumber } from '@/utils';
import style from './style.module.css';
import { useTranslations } from 'next-intl';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange?: (page: number) => void;
};

export function Pagination({ totalItems, itemsPerPage, onPageChange }: Props) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = ensureSearchParams(useSearchParams());
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const t = useTranslations('Pagination');

  const rawPage = isNumber(searchParams.get('page'));
  const currentPage =
    !rawPage || rawPage < 1 || rawPage > totalPages ? 1 : rawPage;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(page));
    router.push(`${pathname}?${next.toString()}`);
    onPageChange?.(page);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const p = Number(inputValue);
    if (!error && p >= 1 && p <= totalPages) {
      goToPage(p);
      setInputValue('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      setError(t('errorOnlyNumbers'));
      return;
    }
    setInputValue(value);
    if (value === '') return setError('');
    const n = Number(value);
    if (n < 1 || n > totalPages)
      setError(t('errorRange', { min: 1, max: totalPages }));
    else setError('');
  };

  return (
    <div className={style.pagination}>
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <div className={style.pagination_block}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t('prev')}
          </button>
          <input
            className={style.pagination_input}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={t('placeholder', { page: currentPage })}
            onKeyDown={handleInputKeyDown}
          />
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t('next')}
          </button>
        </div>
      </form>
      {error ? (
        <div className={style.error}>{error}</div>
      ) : (
        <div>{t('hint', { min: 1, max: totalPages })}</div>
      )}
    </div>
  );
}
