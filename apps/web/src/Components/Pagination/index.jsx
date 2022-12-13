import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeActivePageForPaginationAction,
  incrementActivePagePaginationAction,
  decrementActivePagePaginationAction,
} from '../../actions/salonsAction';
import './pagination.scss';

function Pagination({
  length,
  onClick
}) {

  const [activePage, setActivePage] = useState(1);
  const [arrayPagination, setArrayPagination] = useState([]);
  // const [length, setLength] = useState(length);
  // const [prevPageNode, setPrevPageNode] = useState(null);
  const dispatch = useDispatch();

  const count = 122;
  const limit = 10; // Число элементов на странице

  const indent = 2; // Число цифр показываемых с лева и права от активной
  const ee = 13;  // Количество страниц

  // useEffect(() => {
  //   const pageNumberOne = document.querySelector('.pagination__list-item')
  //   console.log('Pagination pageNumberOne :', pageNumberOne)
  // }, []);

  useEffect(() => {
    let items = [];
    let currentPage = activePage;

    // Количество страниц
    // const length = Math.ceil(count / Math.max(limit, 1));

    // Номера слева и справа относительно активного номера, которые остаются видимыми
    let left = Math.max(currentPage - indent, 1);
    let right = Math.min(left + indent * 2, length);

    // Корректировка когда страница в конце
    if (currentPage >= length - indent) {
      // console.log("Корректировка")
      left = Math.max(length - indent * 2, 1);
      // left = length - indent * 2;
    };

    // Первая страница всегда нужна
    if (left > 1) {
      items.push(1);
    };

    // Пропуск
    if (left > 2) {
      items.push(null);
    };

    // Последваотельность страниц
    for (let page = left; page <= right; page++) {
      items.push(page);
    };

    // Пропуск
    if (right < length - 1) {
      items.push(null);
    };

    // Последнаяя страница
    if (right < length) {
      items.push(length);
    };
    setArrayPagination(items);
  }, [activePage, length]);

  const onClickHandlerNumber = (e) => {

    let page = e.currentTarget.querySelector('.pagination__list-item-number').innerHTML;

    setActivePage(page);
    onClick(page);

    let prevNode =
      e.currentTarget.closest('.pagination__list').querySelector('.pagination__list-item--active')?.classList.remove('pagination__list-item--active');
  }

  const onClickHandlerArrowPrev = (e) => {
    const page = activePage;
    onClick(page - 1);
    setActivePage(page - 1);
    // if (page != 1) dispatch(decrementActivePagePaginationAction(page));
  }

  const onClickHandlerArrowNext = (e) => {
    let page = activePage;
    onClick(page + 1);
    setActivePage(page + 1);
    // if (page != length) dispatch(incrementActivePagePaginationAction(page));
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {/* <li
          className="pagination__arrow-prev"
          onClick={onClickHandlerArrowPrev}
        >
          <svg width="15" height="27" viewBox="0 0 15 27" fill="none">
            <path d="M12.7929 26.7071C13.1834 27.0976 13.8166 27.0976 14.2071 26.7071C14.5976 26.3166 14.5976 25.6834 14.2071 25.2929L12.7929 26.7071ZM1 13.5L0.292893 12.7929C-0.0976315 13.1834 -0.0976315 13.8166 0.292893 14.2071L1 13.5ZM14.2071 1.70711C14.5976 1.31658 14.5976 0.683417 14.2071 0.292893C13.8166 -0.0976311 13.1834 -0.0976311 12.7929 0.292893L14.2071 1.70711ZM14.2071 25.2929L1.70711 12.7929L0.292893 14.2071L12.7929 26.7071L14.2071 25.2929ZM1.70711 14.2071L14.2071 1.70711L12.7929 0.292893L0.292893 12.7929L1.70711 14.2071Z" fill="#F5BFAB" />
          </svg>
        </li> */}
        {arrayPagination.map((item, index) => (item) ?
          <li
            className="pagination__list-item"
            onClick={onClickHandlerNumber}
            key={index}
          >
            <p className={item == activePage ? "pagination__list-item-number pagination__list-item--active" : "pagination__list-item-number"}> {item}</p>
            {/* <p className="pagination__list-item-number"> {item}</p> */}
            <span>{(item == length) ? '' : ','}</span>
          </li> :
          <li
            className="pagination__list-item"
            key={index}
          >
            ...
          </li>
        )}
        {/* <li
          className="pagination__arrow-next"
          onClick={onClickHandlerArrowNext}
        >
          <svg width="15" height="27" viewBox="0 0 15 27" fill="none">
            <path d="M2.20711 0.292892C1.81658 -0.0976315 1.18342 -0.0976315 0.792893 0.292892C0.402369 0.683418 0.402369 1.31658 0.792893 1.70711L2.20711 0.292892ZM14 13.5L14.7071 14.2071C15.0976 13.8166 15.0976 13.1834 14.7071 12.7929L14 13.5ZM0.792893 25.2929C0.402369 25.6834 0.402369 26.3166 0.792893 26.7071C1.18342 27.0976 1.81658 27.0976 2.20711 26.7071L0.792893 25.2929ZM0.792893 1.70711L13.2929 14.2071L14.7071 12.7929L2.20711 0.292892L0.792893 1.70711ZM13.2929 12.7929L0.792893 25.2929L2.20711 26.7071L14.7071 14.2071L13.2929 12.7929Z" fill="#F5BFAB" />
          </svg>
        </li> */}
      </ul>
    </div>
  )
}

export default React.memo(Pagination);