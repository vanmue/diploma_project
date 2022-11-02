import React, {
  useState,
  useEffect
} from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  changeActivePageForPaginationAction,
  incrementActivePagePaginationAction,
  decrementActivePagePaginationAction,
} from '../../actions/salonsAction';
import './pagination.scss';

function Pagination() {
  const activePage = useSelector((store) => store.salonsReducer.activePage);
  const dispatch = useDispatch();
  const [arrayPagination, setArrayPagination] = useState([])

  const count = 122;
  const limit = 10;
  const indent = 2;
  const ee = 13;

  useEffect(() => {
    let items = [];
    let currentPage = activePage;
    // console.log(currentPage)

    // Количество страниц
    const length = Math.ceil(count / Math.max(limit, 1));

    // Номера слева и справа относительно активного номера, которые остаются видимыми
    let left = Math.max(currentPage - indent, 1);
    let right = Math.min(left + indent * 2, length);

    // Корректировка когда страница в конце
    if (currentPage >= length - indent) {
      left = length - indent * 2;
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
  }, [activePage]);

  const onClickHandlerNumber = (e) => {
    dispatch(changeActivePageForPaginationAction(e.currentTarget.querySelector('.pagination__list-item-number').innerHTML));
  }

  const onClickHandlerArrowPrev = (e) => {
    const page = activePage;
    if (page != 1) dispatch(decrementActivePagePaginationAction(page));
  }

  const onClickHandlerArrowNext = (e) => {
    const page = activePage;
    if (page != ee) dispatch(incrementActivePagePaginationAction(page));
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li
          className="pagination__arrow-prev"
          onClick={onClickHandlerArrowPrev}
        >
          <svg width="10" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M5.64645 11.3536C5.84171 11.5488 6.15829 11.5488 6.35355 11.3536C6.54882 11.1583 6.54882 10.8417 6.35355 10.6464L5.64645 11.3536ZM1 6L0.646447 5.64645C0.451184 5.84171 0.451184 6.15829 0.646447 6.35355L1 6ZM6.35355 1.35355C6.54882 1.15829 6.54882 0.841709 6.35355 0.646447C6.15829 0.451184 5.84171 0.451184 5.64645 0.646447L6.35355 1.35355ZM6.35355 10.6464L1.35355 5.64645L0.646447 6.35355L5.64645 11.3536L6.35355 10.6464ZM1.35355 6.35355L6.35355 1.35355L5.64645 0.646447L0.646447 5.64645L1.35355 6.35355Z" fill="#F5BFAB" />
          </svg>
        </li>
        {arrayPagination.map((item, index) => (item) ?
          <li
            className="pagination__list-item"
            onClick={onClickHandlerNumber}
            key={index}
          >
            <p className="pagination__list-item-number"> {item}</p>
            <span>{(item === ee) ? '' : ','}</span>
          </li> :
          <li
            className="pagination__list-item"
            key={index}
          >
            ...
          </li>
        )}
        <li
          className="pagination__arrow-next"
          onClick={onClickHandlerArrowNext}
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1.35355 0.646446C1.15829 0.451184 0.841709 0.451184 0.646447 0.646446C0.451184 0.841709 0.451184 1.15829 0.646447 1.35355L1.35355 0.646446ZM6 6L6.35355 6.35355C6.54882 6.15829 6.54882 5.84171 6.35355 5.64645L6 6ZM0.646447 10.6464C0.451184 10.8417 0.451184 11.1583 0.646447 11.3536C0.841709 11.5488 1.15829 11.5488 1.35355 11.3536L0.646447 10.6464ZM0.646447 1.35355L5.64645 6.35355L6.35355 5.64645L1.35355 0.646446L0.646447 1.35355ZM5.64645 5.64645L0.646447 10.6464L1.35355 11.3536L6.35355 6.35355L5.64645 5.64645Z" fill="#F5BFAB" />
          </svg>
        </li>
      </ul>
    </div>
  )
}

export default React.memo(Pagination);