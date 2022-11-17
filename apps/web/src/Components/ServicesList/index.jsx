import React from 'react';
import propTypes from 'prop-types';
import './services-list.scss';

function ServicesList({ services, color }) {
  return (
    <ul
      className="services-list"
      style={{ "overflow-y": services.length > 6 ? "scroll" : "hidden", height: "162px", color: `${color}` }}
    >
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