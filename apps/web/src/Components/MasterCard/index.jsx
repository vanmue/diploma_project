import React from 'react';
import propTypes from 'prop-types';
import Rating from '../Rating';
import Button from '../Button';
import './master-card.scss';

function MasterCard({
  salon,
  name,
  pathImg,
  specialization,
  description,
}) {

  return (
    <div className='master-card'>
      <div className="master-card__foto">
        <img className="master-card__foto-foto" src={pathImg} alt="Фото мастера" />
      </div>
      <div className="master-card__info">
        <div className="master-card__title">
          <p className="master-card__name">
            {name}
          </p>
          <span>&nbsp;-&nbsp;</span>
          <p className="master-card__specialization">
            {specialization}
          </p>
        </div>

        <div className="master-card__info-detail">
          <div className="master-card__wrapp-rating">
            <Rating
              isAcive={true}
            />
          </div>

          <div className="master-card__place-work">
            <p className="master-card__place-work-text">Работает в салоне:&nbsp;</p>
            <p className="master-card__place-work-salon">{salon}</p>
          </div>

          <div className="master-card__info-desk">
            <p>{description}</p>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu nibh vitae amet. Ipsum, pharetra donec ornare velit. Id at quisque accumsan risus ac ipsum ut. Sit elit, facilisi proin non malesuada sociis tristique. Viverra augue lorem ut quisque quam tortor, malesuada iaculis.</p>
            <p>Et elementum at nulla venenatis, faucibus integer. Auctor neque eros, viverra rutrum. Fames ultrices condimentum tortor nec penatibus. Velit imperdiet sapien fringilla vestibulum sit fames.</p> */}
          </div>
          <div className="master-card__wrapp-button">
            <Button
              background='#A40123'
              colorText='#F5BFAB'
            >
              Записаться
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

MasterCard.propTypes = {
  salon: propTypes.string,
  name: propTypes.string,
  pathImg: propTypes.string,
  specialization: propTypes.string,
  description: propTypes.string,
}

MasterCard.defaultProps = {
  salon: '-',
  name: '-',
  specialization: '-',
  description: '-',
}

export default React.memo(MasterCard);