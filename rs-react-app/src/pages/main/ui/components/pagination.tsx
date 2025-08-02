import { PageContext, PaginationProps, useStorage } from '@/shared';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.css';

export const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { numberPage, setNumberPage } = useContext(PageContext);
  const { storedValue, setStoredValue } = useStorage('page', null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (storedValue) setNumberPage(Number(storedValue));
  }, [setNumberPage, storedValue]);

  useEffect(() => {
    if (numberPage) setCurrentPage(numberPage);
  }, [numberPage]);

  const goToPage = (page: number) => {
    event.preventDefault();
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      navigate(`?page=${page}`, { replace: true });
      onPageChange(page);
      setNumberPage(page);
      setStoredValue(`${page}`);
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
            onClick={() => goToPage(currentPage - 1)}
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
            onClick={() => goToPage(currentPage + 1)}
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
