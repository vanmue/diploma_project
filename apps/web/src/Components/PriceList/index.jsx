import React from 'react';
import propTypes from 'prop-types';
import './price-list.scss';

function PriceList({ services }) {
  return (
    <ul className="price-list">
      {services.map(item =>
        <li className="price-list__item">
          <div className="price-list__service">
            <p className="price-list__service-name">{item.serviceName}</p>
            <p className="price-list__service-price">{item.servicePrice}р</p>
          </div>
          <div className="price-list__service-desc">
            <p><span>+</span>{item.serviceDesc} </p>
          </div>
        </li>
      )}
    </ul>
  )
}

PriceList.propTypes = {
  services: propTypes.arrayOf(propTypes.object).isRequired
}

export default React.memo(PriceList);