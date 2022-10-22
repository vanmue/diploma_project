import React from 'react';
import propTypes from 'prop-types';
import './services-list.scss';

function ServicesList({ services }) {
  return (
    <ul className="services-list">
      {services.map((item, index) =>
        <li
          className="services-list__item"
          key={index}
        >
          <p>{item}</p>
        </li>
      )}
    </ul>
  )
}

ServicesList.propTypes = {
  services: propTypes.arrayOf(propTypes.string)
}

ServicesList.defaultProps = {
  services: []
}

export default React.memo(ServicesList);