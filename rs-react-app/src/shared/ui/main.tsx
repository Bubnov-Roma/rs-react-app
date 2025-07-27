import { HeaderProps } from '../interfaces';
import style from './style.module.css';

export const Main = ({ children }: HeaderProps) => {
  return <main className={style.main}>{children}</main>;
};
