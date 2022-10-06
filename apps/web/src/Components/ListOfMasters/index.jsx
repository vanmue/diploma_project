import React from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import './style.css';

function ListOfMasters({ masters }) {
  return (
    <ul className='list-of-masters'>
      {masters.map((item, index) =>
        <li
          className='list-of-masters__item'
          key={index}
        >
          <Link to="/recording">
            <img
              className='list-of-masters__photo-of-master'
              src={item.photoOfMaster}
              alt="Фото мастера"
            />
          </Link>
          <div className='list-of-masters__name-of-master'>
            {item.masterName}
          </div>
          <div className='list-of-masters__specialization-of-master'>
            {item.specializationOfMaster}
          </div>
        </li>
      )}
    </ul>
  )
}

ListOfMasters.propTypes = {
  masters: propTypes.arrayOf(propTypes.object).isRequired
}

export default React.memo(ListOfMasters);