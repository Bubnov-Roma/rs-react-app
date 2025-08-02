import { PageContext, useStorage, type SearchInputType } from '@/shared';
import { useContext, useState, type ChangeEvent } from 'react';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';

export const SearchInput = (props: SearchInputType) => {
  const { setStateIsLoading } = props;
  const { storedValue: searchValue, setStoredValue: setSearchValue } =
    useStorage('storageValue', '');
  const { storedValue: storedPage, setStoredValue: setStoredPage } = useStorage(
    'page',
    null
  );
  const [value, setValue] = useState(searchValue);
  const { Filtered, setNumberPage } = useContext(PageContext);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target) setValue(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }): void => {
    setStateIsLoading(true);
    event.preventDefault();
    setSearchValue(value);
    Filtered(value);
    setNumberPage(1);
    setStoredPage(1);
    setStateIsLoading(false);
    navigate(`/page/${storedPage}`, { replace: true });
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
