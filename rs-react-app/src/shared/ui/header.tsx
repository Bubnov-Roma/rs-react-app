import { HeaderProps } from '../interfaces';
import style from './style.module.css';

export const Header = ({ children }: HeaderProps) => {
  return <header className={style.header}>{children}</header>;
};
