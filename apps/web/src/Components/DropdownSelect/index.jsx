import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import './dropdown-select.scss';

function DropdownSelect({
  dropdownTitle,
  items,
  onChange
}) {
  const [btnActive, setBtnActive] = useState(false);
  const [itemsSort, setItemsSort] = useState(items);
  const [value, setValue] = useState('');
  const [sampleCounter, setSampleCounter] = useState(0);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Устанавливаем заголовок в dropdown
  useEffect(() => {
    inputRef.current.placeholder = dropdownTitle;
  });

  useEffect(() => {
    inputRef.current.placeholder = dropdownTitle;
    setItemsSort(items)
  }, [items]);

  // При клике показываем список вариантов
  const handleClickBtn = () => {
    setBtnActive(!btnActive);
  }

  // Делаем выборку по значению с помощью ругулярного выражения
  const sortByValue = (value) => {

    let regexp = new RegExp(`${value}`, 'i');

    let arr = [];
    let counter = 0;

    items.forEach(el => {

      if (value != '') {
        if (el.name.match(regexp) !== null) {
          arr.push(el);
          counter = counter + 1;
        }
      }
    });

    setItemsSort(arr.concat(items));
    setSampleCounter(counter);
  }

  // Обработчик input
  const handleChangeInput = (e) => {

    setValue(e.target.value);
    sortByValue(e.target.value);
    if (e.target.value.length == 0) onChange(null);
  }

  // Обработчик выбора одного из вариантов
  const handleClickListItem = (e) => {

    setValue(e.currentTarget.innerHTML);
    sortByValue(e.currentTarget.innerHTML);
    onChange(e.currentTarget.dataset.drpdnItemId);
    inputRef.current.focus();
  }

  return (
    <div className="dropdown-select">
      <div
        className="dropdown-select__btn"
        onClick={handleClickBtn}
      >
        <input
          className="dropdown-select__input"
          type="text"
          value={value}
          ref={inputRef}
          onChange={handleChangeInput}
        />
        <div className="dropdown-select__img">
          <svg width="20" height="10" viewBox="0 0 22 12" fill="none">
            <path d="M21.3536 1.35355C21.5488 1.15829 21.5488 0.841709 21.3536 0.646447C21.1583 0.451184 20.8417 0.451184 20.6464 0.646447L21.3536 1.35355ZM11 11L10.6464 11.3536C10.8417 11.5488 11.1583 11.5488 11.3536 11.3536L11 11ZM1.35355 0.646447C1.15829 0.451184 0.841709 0.451184 0.646447 0.646447C0.451184 0.841709 0.451184 1.15829 0.646447 1.35355L1.35355 0.646447ZM20.6464 0.646447L10.6464 10.6464L11.3536 11.3536L21.3536 1.35355L20.6464 0.646447ZM11.3536 10.6464L1.35355 0.646447L0.646447 1.35355L10.6464 11.3536L11.3536 10.6464Z" fill="white" />
          </svg>
        </div>
      </div>
      <ul
        className="dropdown-select__list"
        style={{ display: btnActive ? "block" : "none" }}
        ref={listRef}
      >
        {itemsSort?.map((item, index) => {
          return <li
            className="dropdown-select__list-item"
            data-drpdn-item-id={item.id}
            key={index}
            style={{ background: (sampleCounter > 0 && index < sampleCounter) ? "#F5BFAB" : "#FFFFFF" }}
            onClick={handleClickListItem}
          >
            {item.name}
          </li>
        })}
      </ul>
    </div >
  )
}

DropdownSelect.propTypes = {
  dropdownTitle: propTypes.string,
  items: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func
}

DropdownSelect.defaultProps = {
  dropdownTitle: 'Выберите',
  items: [],
  onChange: () => { }
}

export default React.memo(DropdownSelect);