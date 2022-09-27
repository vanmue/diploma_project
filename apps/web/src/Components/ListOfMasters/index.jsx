import React from 'react';
import { Link } from "react-router-dom";
import propTypes from 'prop-types';
import './style.css';

function ListOfMasters({ masters }) {
  return (
    <ul className='list-of-masters'>
      {masters.map(item =>
        <li>
          <Link to="/recording">
            <img
              className='list-of-masters__photo'
              src={item.photoOfMaster}
              alt="Фото мастера"
            />
          </Link>
          <div className='list-of-masters__name'>
            {item.masterName}
          </div>
          <div className='list-of-masters__specialization'>
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