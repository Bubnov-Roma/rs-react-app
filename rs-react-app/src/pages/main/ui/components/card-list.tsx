import { DataListProps } from '@/shared';
import { Link, Outlet } from 'react-router-dom';
import style from './style.module.css';
export const CardList = ({
  data,
  currentPage,
  itemsPerPage,
}: DataListProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div className={style.wrapper}>
      <div className={style.card_list}>
        {currentItems.map((item, index) => (
          <Link to={`/page/${currentPage}/${item.name}`} key={index}>
            {item.name.toLocaleUpperCase()}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};
