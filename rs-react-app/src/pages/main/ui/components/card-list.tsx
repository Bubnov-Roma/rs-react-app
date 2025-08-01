import { DataListProps } from '@/shared/index';
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
          <div key={index} className={style.card_item}>
            <input
              type="checkbox"
              // checked={isChecked}
              // onChange={handleCheckboxChange}
            />
            <Link to={`/page/${currentPage}/${item.name}`}>
              {item.name.toLocaleUpperCase()}
            </Link>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};
