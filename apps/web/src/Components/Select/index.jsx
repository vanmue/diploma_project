import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Select({ cities, salons }) {
  return (
    <select
      className='select'
      name={(cities.length > 0) ? 'cities' :
        (salons.length > 0) ? 'salons' :
          ''
      }
    >
      {cities.map((item, index) =>
        <option
          className='select__item'
          key={index}
        > {item} </option>
      )};
    </select>
  )
}

Select.propTypes = {
  cities: propTypes.arrayOf(propTypes.string),
  salons: propTypes.arrayOf(propTypes.string)
}

Select.defaultProps = {
  cities: [],
  salons: []
}

export default React.memo(Select);