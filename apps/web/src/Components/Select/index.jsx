import React from 'react';
import propTypes from 'prop-types';
import './select.scss';

function Select({ titleSelect, cities, salons }) {
  console.log(titleSelect)
  return (
    <div className='dropdown'>
      <button className='dropdown__btn'>
        {/* {titleSelect} */}
        <p>{titleSelect}</p>
        <svg className='dropdown__arrow-down' width="20" height="10" viewBox="0 0 22 12" fill="none">
          <path d="M21.3536 1.35355C21.5488 1.15829 21.5488 0.841709 21.3536 0.646447C21.1583 0.451184 20.8417 0.451184 20.6464 0.646447L21.3536 1.35355ZM11 11L10.6464 11.3536C10.8417 11.5488 11.1583 11.5488 11.3536 11.3536L11 11ZM1.35355 0.646447C1.15829 0.451184 0.841709 0.451184 0.646447 0.646447C0.451184 0.841709 0.451184 1.15829 0.646447 1.35355L1.35355 0.646447ZM20.6464 0.646447L10.6464 10.6464L11.3536 11.3536L21.3536 1.35355L20.6464 0.646447ZM11.3536 10.6464L1.35355 0.646447L0.646447 1.35355L10.6464 11.3536L11.3536 10.6464Z" fill="white" />
        </svg>
      </button>
      {/* <ul
        className='select'
        name={(cities.length > 0) ? 'city' :
          (salons.length > 0) ? 'salon' :
            ''
        }
      >
        {cities.map((item, index) =>
          <li
            className='select__item'
            key={index}
          >
            {item}
          </li>
        )}
      </ul> */}
    </div>
  )
}

Select.propTypes = {
  cities: propTypes.string,
  cities: propTypes.arrayOf(propTypes.string),
  salons: propTypes.arrayOf(propTypes.string)
}

Select.defaultProps = {
  cities: '',
  cities: [],
  salons: []
}

export default React.memo(Select);