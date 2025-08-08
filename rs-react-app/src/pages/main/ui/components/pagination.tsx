import { PageContext, PaginationProps } from '@/shared';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
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
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (numberPage) setCurrentPage(numberPage);
  }, [numberPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      navigate(`?page=${page}`, { replace: true });
      onPageChange(page);
      setNumberPage(page);
    }
  };

  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedValue = Number(inputValue);

    if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > totalPages) {
      setError(`Please enter a number between 1 and ${totalPages}`);
      return;
    }

    setInputValue('');
    setError('');
    goToPage(parsedValue);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      <form className={style.form} onSubmit={handleInputSubmit}>
        <input
          className={style.input}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`From 1 to ${totalPages}`}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div className={style.error}>{error}</div>}
      <div className={style.pagination_block}>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <p className={style.page_number}>{currentPage}</p>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
