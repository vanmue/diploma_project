import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import './dropdown-select.scss';

function DropdownSelect({
  dropdownTitle,
  items
}) {
  const [btnActive, setBtnActive] = useState(false);
  const [itemsSort, setItemsSort] = useState(items.sort());
  const [value, setValue] = useState('');
  const [sampleCounter, setSampleCounter] = useState(0);

  const inputRef = useRef(null);
  const listRef = useRef(null);


  useEffect(() => {
    inputRef.current.placeholder = dropdownTitle;
  }, []);

  useEffect(() => {
    // console.log('listRef.current.children: ', listRef.current.children);
    // console.log('useEffect sampleCounter: ', sampleCounter);

    //   listRef.current.children[0].style.background = "#F5BFAB";
    //   listRef.current.children[0].style.background = "#FFFFFF";

  }, [sampleCounter]);

  const handleClickBtn = () => {
    setBtnActive(!btnActive);
  }

  const handleChangeInput = (e) => {
    setValue(e.target.value);

    let regexp = new RegExp(`${e.target.value}`, 'i');

    let arr = [];
    let counter = 0;

    items.sort().forEach(el => {

      if (e.target.value != '') {
        if (el.match(regexp) !== null) {
          arr.push(el);
          counter = counter + 1;
        }
      }

    })

    setItemsSort(arr.concat(items.sort()));
    setSampleCounter(counter);
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
        {itemsSort.map((item, index) => {
          if (sampleCounter > 0) {
            return <li
              className="dropdown-select__list-item"
              key={index}
              style={{ background: (index < sampleCounter) ? "#F5BFAB" : "#FFFFFF" }}
            >
              {item}
            </li>
          }
          return <li
            className="dropdown-select__list-item"
            key={index}
          >
            {item}
          </li>

        })}
      </ul>
    </div >
  )
}

DropdownSelect.propTypes = {
  dropdownTitle: propTypes.string,
  items: propTypes.array,
}

DropdownSelect.defaultProps = {
  dropdownTitle: 'Выберите',
  items: [],
}

export default React.memo(DropdownSelect);