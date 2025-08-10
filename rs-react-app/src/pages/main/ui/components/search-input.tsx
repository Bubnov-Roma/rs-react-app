import { PageContext } from '@/shared';
import { useContext, useState, type ChangeEvent } from 'react';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

export const SearchInput = () => {
  const {
    Filtered,
    numberPage,
    setNumberPage,
    storedSearchValue,
    setStoredSearchValue,
  } = useContext(PageContext);

  const [value, setValue] = useState(storedSearchValue);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target) setValue(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }): void => {
    event.preventDefault();
    setStoredSearchValue(value);
    Filtered(value);
    setNumberPage(1);
    navigate(`/page/${numberPage}`, { replace: true });
  };

  return (
    <div className={style.form_block}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Enter Name Pokemon"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
