import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './pagination.scss';

function Pagination({
  length,
  onClick
}) {

  const [activePage, setActivePage] = useState(1);
  const [arrayPagination, setArrayPagination] = useState([]);
  const dispatch = useDispatch();

  const count = 122;
  const limit = 10; // Число элементов на странице

  const indent = 2; // Число цифр показываемых с лева и права от активной
  const ee = 13;  // Количество страниц

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

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {arrayPagination.map((item, index) => (item) ?
          <li
            className="pagination__list-item"
            onClick={onClickHandlerNumber}
            key={index}
          >
            <p className={item == activePage ? "pagination__list-item-number pagination__list-item--active" : "pagination__list-item-number"}> {item}</p>
            <span>{(item == length) ? '' : ','}</span>
          </li> :
          <li
            className="pagination__list-item"
            key={index}
          >
            ...
          </li>
        )}
      </ul>
    </div>
  )
}

export default React.memo(Pagination);