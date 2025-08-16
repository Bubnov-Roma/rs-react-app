'use client';

import { useContext } from 'react';
import { CardList } from './card-list';
import { LoadingComponent, PageContext } from '@/shared';
import { useSearchParams } from 'react-router-dom';
import { SelectionPanel } from '@/features';
import { isNumber } from '@/utils';
import style from './style.module.css';

const ITEMS_PER_PAGE = 5;

export const PaginatedList = () => {
  const { pageContext, numberPage, setNumberPage } = useContext(PageContext);
  const [searchParams] = useSearchParams();

  const pageFromUrl = isNumber(searchParams.get('page'), 1);

  if (numberPage !== pageFromUrl) {
    setNumberPage(pageFromUrl);
  }

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
              currentPage={pageFromUrl}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
          <SelectionPanel />
        </>
      )}
    </>
  );
};
