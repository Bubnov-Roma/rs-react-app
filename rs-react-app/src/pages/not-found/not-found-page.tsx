import { useContext, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { PageContext } from '@/shared';

export function NotFoundPage(): ReactElement {
  const navigate = useNavigate();
  const { numberPage, setNumberPage } = useContext(PageContext);
  const handleClick = () => {
    if (!numberPage) setNumberPage(1);
    navigate(`/page/${numberPage}`);
  };
  return (
    <>
      <div className="page-404">
        <div className="content-404">
          <p className="error-text">404 Not Found</p>
          <button className="button-main-head" onClick={handleClick}>
            To Main page
          </button>
        </div>
      </div>
    </>
  );
}
