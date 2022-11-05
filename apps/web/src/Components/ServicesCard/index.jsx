import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './services-card.scss';

function SevicesCard({ title, pathImg }) {
  return (
    <Link
      className="services-card"
      style={{ backgroundImage: `url(${pathImg})` }}
      to='/salons'
    >
      <div className="services-card__title">
        {title}
      </div>
    </Link>
  )
}

SevicesCard.propTypes = {
  title: propTypes.string,
  pathImg: propTypes.string,
}

SevicesCard.defaultProps = {
  title: '-',
  pathImg: '-',
}

export default React.memo(SevicesCard);