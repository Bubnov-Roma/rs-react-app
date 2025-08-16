'use client';

import { PageContext, PaginationProps } from '@/shared';
import { ChangeEvent, useContext, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import style from './style.module.css';

export const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const { setNumberPage } = useContext(PageContext);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const pageParam = Number(searchParams.get('page') || 1);
    setCurrentPage(pageParam);
    setNumberPage(pageParam);
  }, [searchParams, setNumberPage]);

  const goToPage = (
    page: number,
    event?: React.MouseEvent | React.KeyboardEvent
  ) => {
    event?.preventDefault();
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      router.push(`${pathname}?${params.toString()}`);
      onPageChange?.(page);
      setNumberPage(page);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const page = Number(inputValue);
      if (!error && page >= 1 && page <= totalPages) {
        goToPage(page);
        setInputValue('');
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    if (!/^\d*$/.test(value)) {
      setError('Only numeric values are allowed');
      return;
    }
    setInputValue(value);
    if (value === '') {
      setError('');
      return;
    }
    const numericValue = Number(value);
    if (numericValue < 1 || numericValue > totalPages) {
      setError(`Enter a number from 1 to ${totalPages}`);
    } else {
      setError('');
    }
  };

  return (
    <div className={style.pagination}>
      <form className={style.form}>
        <div className={style.pagination_block}>
          <button
            onClick={(e) => goToPage(currentPage - 1, e)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <input
            className={style.pagination_input}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={`Page ${currentPage}`}
            onKeyDown={handleInputKeyDown}
          />
          <button
            onClick={(e) => goToPage(currentPage + 1, e)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </form>
      {error ? (
        <div className={style.error}>{error}</div>
      ) : (
        <div>Type page from 1 to {totalPages} and tap Enter</div>
      )}
    </div>
  );
};
