import { useEffect } from 'react';
import { useTheme } from '../hooks';
import style from './style.module.css';

const DARK_ICON = '/assets/img/sun.png';
const LIGHT_ICON = '/assets/img/moon.png';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle('dark_theme', theme === 'dark');
  }, [theme]);

  return (
    <label className={style.switch}>
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        className={style.checkbox}
      />
      <span className={style.track}>
        <img
          src={theme === 'dark' ? LIGHT_ICON : DARK_ICON}
          alt="theme icon"
          className={style.thumb}
        />
      </span>
    </label>
  );
};
