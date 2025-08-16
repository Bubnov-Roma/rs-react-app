'use client';

import { PageContext } from '@/shared';
import { useContext, useState, type ChangeEvent } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ensureSearchParams } from '@/utils';
import style from './style.module.css';
import { useTranslations } from 'next-intl';

export const SearchInput = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('PageContext must be used inside PageContext.Provider');
  }
  const { setNumberPage, storedSearchValue, setStoredSearchValue } = context;

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
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={t('placeholder')}
        />
        <button type="submit">{t('submit')}</button>
      </form>
    </div>
  );
};
