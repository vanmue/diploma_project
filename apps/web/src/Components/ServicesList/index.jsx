import React from 'react';
import propTypes from 'prop-types';
import './services-list.scss';

function ServicesList({ services, color }) {
  return (
    <ul
      className="services-list"
      style={{ overflowY: services.length > 6 ? "scroll" : "hidden", height: "162px", color: `${color}` }}
    >
      {services.map(item =>
        <li
          className="services-list__item"
          key={item.id}
        >
          <p>{item.name}</p>
        </li>
      )}
    </ul>
  )
}

ServicesList.propTypes = {
  services: propTypes.arrayOf(propTypes.object)
}

ServicesList.defaultProps = {
  services: []
}

export default React.memo(ServicesList);