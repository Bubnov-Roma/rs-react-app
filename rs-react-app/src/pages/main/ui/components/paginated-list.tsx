import { useContext, useEffect, useState } from 'react';
import { CardList } from './card-list';
import { LoadingComponent, PageContext, useAppSelector } from '@/shared';
import { useNavigate, useParams } from 'react-router-dom';
import style from './style.module.css';
import { SelectionPanel } from '@/features';

const ITEMS_PER_PAGE = 5;
export const PaginatedList = () => {
  const navigateTo = useNavigate();
  const { pageContext, numberPage, setNumberPage } = useContext(PageContext);
  const { page } = useParams();

  useEffect(() => {
    if (!page) {
      void navigateTo('/404');
      return;
    }
    if (numberPage) navigateTo(`/page/${numberPage}`);
    else {
      setNumberPage(1);
      navigateTo(`/page/${numberPage}`);
    }
  }, [numberPage, navigateTo, page, setNumberPage]);

  return (
    <>
      {!pageContext ? (
        <LoadingComponent />
      ) : !pageContext.length ? (
        <div className={style.nothing}>
          <h1>Oops...</h1>
          <h4>Nothing was found for your request. Try again</h4>
        </div>
      ) : (
        <>
          <div className={style.content_wrapper}>
            <CardList
              data={pageContext}
              currentPage={numberPage}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
          <SelectionPanel />
        </>
      )}
    </>
  );
};
