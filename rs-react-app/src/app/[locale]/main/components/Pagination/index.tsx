'use client';

import { ChangeEvent, useState } from 'react';
import style from './style.module.css';
import { useTranslations } from 'next-intl';
import { ITEMS_PER_PAGE, usePageContext } from '@/shared';

export function Pagination() {
  const context = usePageContext();
  const { numberPage, setNumberPage, totalItems } = context;

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const t = useTranslations('Pagination');

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setNumberPage(page);
  };

  const handleInputKeyDown = (e: React.FormEvent) => {
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
      <div className={style.pagination_block}>
        <button
          onClick={() => goToPage(numberPage - 1)}
          disabled={numberPage === 1}
          className={style.arrow_btn}
          aria-label="Previous page"
        >
          ◀
        </button>
        <form className={style.form} onSubmit={handleInputKeyDown}>
          <input
            className={style.input}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={t('placeholder', { page: numberPage })}
          />
          <button type="submit" className={style.search_btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
        <button
          onClick={() => goToPage(numberPage + 1)}
          disabled={numberPage === totalPages}
          className={style.arrow_btn}
          aria-label="Next page"
        >
          ▶
        </button>
      </div>
      {error && <div className={style.error}>{error}</div>}
    </div>
  );
}
