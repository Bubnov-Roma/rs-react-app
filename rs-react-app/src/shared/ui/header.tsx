import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';
import { useContext } from 'react';
import { PageContext } from '../context';
import style from './style.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const { numberPage } = useContext(PageContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const buttonTo = event.currentTarget.dataset.to;
    if (buttonTo === 'main') {
      navigate(`page/${numberPage}`);
    } else if (buttonTo === 'about') {
      navigate(buttonTo);
    }
  };

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <h1 className={style.title}>
          <Link to="/">Pokémon Search</Link>
        </h1>
        <nav className={style.navigation_bar}>
          <button onClick={handleClick} data-to="main">
            Main
          </button>
          <button onClick={handleClick} data-to="about">
            About
          </button>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};
