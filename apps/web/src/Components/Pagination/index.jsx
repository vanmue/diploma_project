import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeActivePageForPaginationAction,
  // changeArrayPaginationAction
} from '../../actions/salonsAction';
import './pagination.scss';

function Pagination() {
  const activePage = useSelector((store) => store.salonsReducer.activePage);
  const dispatch = useDispatch();
  const [arrayPagination, setArrayPagination] = useState([])

  // console.log('activePage: ', activePage);
  // const [items, setItems] = useState([]);
  const count = 122;
  const limit = 10;
  const indent = 2;
  const ee = 13;
  // const activePage = 5;
  // let items = [];

  useEffect(() => {
    let items = [];
    let currentPage = activePage;
    // console.log('Pagination')
    // console.log('items in useRffect START: ', items)

    // Количество страниц
    const length = Math.ceil(count / Math.max(limit, 1));
    // console.log('length: ', length)

    // Номера слева и справа относительно активного номера, которые остаются видимыми
    console.log('activePage: ', activePage)
    console.log('currentPage: ', currentPage)
    console.log('Number(currentPage): ', Number(currentPage))
    console.log('typeof currentPage: ', typeof currentPage)
    let left = Math.max(currentPage - indent, 1);
    // console.log('left: ', left)

    // console.log('activePage: ', activePage)
    // console.log('indent: ', indent)
    // let ss = activePage + indent;
    let right = Math.min(left + indent * 2, length);
    // console.log('right: ', right)

    // Корректировка когда страница в конце

    // Массив номеров, чтобы удобней рендерить
    // let items = [];

    // Первая страница всегда нужна
    if (left > 1) {
      items.push(1);
      // console.log('if (left > 1) items.push(1):', items)
    };

    // Пропуск
    if (left > 2) {
      items.push(null);
      // console.log('if (left > 2) items.push(null):', items)
    };

    // Последваотельность страниц
    for (let page = left; page <= right; page++) {
      items.push(page);
    };
    // console.log('for (let page = left; page <= right; page++) items.push(page):', items)

    // Пропуск
    if (right < length - 1) {
      items.push(null);
      // console.log(' if (right < length - 1) items.push(null):', items)
    };

    // Последнаяя страница
    if (right < length) {
      items.push(length);
      // console.log(' if (right < length) items.push(length):', items)
    };

    // console.log('items in useRffect END: ', items)
    // console.log('arrayPagination END: ', arrayPagination)
    setArrayPagination(items)
  }, [activePage]);

  const onClickHandler = (e) => {
    // console.log('e.target : ', e.target)
    // console.log('e.target.innerHTML: ', e.target.innerHTML)
    // console.log('e.currentTarget.queryselector("p"): ', e.currentTarget.querySelector('.pagination__list-item-number'))
    dispatch(changeActivePageForPaginationAction(e.currentTarget.querySelector('.pagination__list-item-number').innerHTML));
  }

  const onClickHandlerArrow = (e) => {
    dispatch(changeActivePageForPaginationAction(e.currentTarget.querySelector('.pagination__list-item-number').innerHTML));
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__arrow-prev">
          <svg width="10" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M5.64645 11.3536C5.84171 11.5488 6.15829 11.5488 6.35355 11.3536C6.54882 11.1583 6.54882 10.8417 6.35355 10.6464L5.64645 11.3536ZM1 6L0.646447 5.64645C0.451184 5.84171 0.451184 6.15829 0.646447 6.35355L1 6ZM6.35355 1.35355C6.54882 1.15829 6.54882 0.841709 6.35355 0.646447C6.15829 0.451184 5.84171 0.451184 5.64645 0.646447L6.35355 1.35355ZM6.35355 10.6464L1.35355 5.64645L0.646447 6.35355L5.64645 11.3536L6.35355 10.6464ZM1.35355 6.35355L6.35355 1.35355L5.64645 0.646447L0.646447 5.64645L1.35355 6.35355Z" fill="#F5BFAB" />
          </svg>
        </li>
        {arrayPagination.map((item, index) => (item) ?
          <li
            className="pagination__list-item"
            onClick={onClickHandler}
            key={index}
          >
            <p className="pagination__list-item-number"> {item}</p>
            <span>{(item == 1 || item == ee) ? '' : ','}</span>
          </li> :
          <li
            className="pagination__list-item"
            key={index}
          >
            ...
          </li>
        )}
        <li className="pagination__arrow-next">
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1.35355 0.646446C1.15829 0.451184 0.841709 0.451184 0.646447 0.646446C0.451184 0.841709 0.451184 1.15829 0.646447 1.35355L1.35355 0.646446ZM6 6L6.35355 6.35355C6.54882 6.15829 6.54882 5.84171 6.35355 5.64645L6 6ZM0.646447 10.6464C0.451184 10.8417 0.451184 11.1583 0.646447 11.3536C0.841709 11.5488 1.15829 11.5488 1.35355 11.3536L0.646447 10.6464ZM0.646447 1.35355L5.64645 6.35355L6.35355 5.64645L1.35355 0.646446L0.646447 1.35355ZM5.64645 5.64645L0.646447 10.6464L1.35355 11.3536L6.35355 6.35355L5.64645 5.64645Z" fill="#F5BFAB" />
          </svg>
        </li>
      </ul>
    </div>
  )
}

export default React.memo(Pagination);