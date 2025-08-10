import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle, PageContext } from '@/shared';
import style from './style.module.css';

export const Header = () => {
  const { numberPage } = useContext(PageContext);

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <h1 className={style.title}>
          <Link to="/">Pokémon Search</Link>
        </h1>
        <nav className={style.navigation_bar}>
          <Link to={`page/${numberPage}`}>Main</Link>
          <Link to={`about`}>About</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};
