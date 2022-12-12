import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import './drpdn-for-add-salons.scss';

function DrpdnForAddSalons({
  what,
  dropdownTitle,
  items,
  onChange
}) {
  const [aboutWhat, setAboutWhat] = useState(what + 'drpdn');
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
    setItemsSort(items);
  }, [items]);

  // При клике показываем список вариантов
  const handleClickBtn = () => {
    setBtnActive(prevBtnActive => !prevBtnActive);
  }

  // Обработчик input
  const handleChangeInput = (e) => {

    setValue(e.target.value);
    sortByValue(e.target.value);
    if (e.target.value.length == 0) onChange(null);
    // console.log('DropdownSelect handleChangeInput e.target.value.length:', e.target.value.length);
  }

  // Обработчик выбора одного из вариантов
  const handleClickListItem = (e) => {

    setValue(e.currentTarget.innerHTML);
    sortByValue(e.currentTarget.innerHTML);
    onChange(e.currentTarget.dataset.drpdnItemId);
    setBtnActive(prevBtnActive => !prevBtnActive);
    inputRef.current.focus();
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

  return (
    <div className="drpdn-for-add-salons">
      <div
        className="drpdn-for-add-salons__btn"
        onClick={handleClickBtn}
      >
        <input
          className="drpdn-for-add-salons__input"
          type="text"
          value={value}
          ref={inputRef}
          onChange={handleChangeInput}
        />
      </div>
      <ul
        className="drpdn-for-add-salons__list"
        style={{ display: btnActive ? "block" : "none" }}
        ref={listRef}
      >
        {itemsSort?.map((item, index) => {
          return <li
            className="drpdn-for-add-salons__list-item"
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

DrpdnForAddSalons.propTypes = {
  what: propTypes.string,
  dropdownTitle: propTypes.string,
  items: propTypes.arrayOf(propTypes.object),
  onChange: propTypes.func
}

DrpdnForAddSalons.defaultProps = {
  dropdownTitle: 'Выберите',
  items: [],
  onChange: () => { }
}

export default React.memo(DrpdnForAddSalons);