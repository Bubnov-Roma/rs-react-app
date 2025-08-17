'use client';

import { PageContext } from '@/shared';
import { useContext, useState, type ChangeEvent } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ensureSearchParams } from '@/utils';
import style from './style.module.css';
import { useTranslations } from 'next-intl';
import PageLoader from '@/app/[locale]/components/PageLoader';

export const SearchInput = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('PageContext must be used inside PageContext.Provider');
  }

  const { setNumberPage, storedSearchValue, setStoredSearchValue, isLoading } =
    context;

  const t = useTranslations('Search');
  const [value, setValue] = useState(storedSearchValue);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = ensureSearchParams(useSearchParams());

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    setStoredSearchValue(value);
    setNumberPage(1);

    const next = new URLSearchParams(searchParams.toString());
    next.set('page', '1');
    if (value) next.set('search', value);
    else next.delete('search');

    router.push(`${pathname}?${next.toString()}`);
  };

  return (
    <div className={style.form_block}>
      {isLoading && <PageLoader />}
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={t('placeholder')}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={style.search_btn}
          aria-label={t('submit')}
          disabled={isLoading}
        >
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
    </div>
  );
};
