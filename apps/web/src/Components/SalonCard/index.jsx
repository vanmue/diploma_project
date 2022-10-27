import React from 'react';
import propTypes from 'prop-types';
import ServicesList from '../ServicesList';
import Button from '../Button';
import './salon-card.scss';

function SalonCard({
  salonTitle,
  address,
  workinghours,
  telephone,
  parking,
  detailedInformation,
  pathImg
}) {

  return (
    <div className="salon-card">
      <div className="salon-card__img">
        <img src={pathImg} alt="Фото салона" />
      </div>
      <div className="salon-card__info">
        <p className="salon-card__title">
          {salonTitle}
        </p>
        <div className="salon-card__info-flex">
          <div className="salon-card__service-information">
            <div className="salon-card__address">
              {address}
            </div>
            <div className="salon-card__working-hours">
              <p>Время работы: c <span>10:00</span> до <span>20:00</span> <span>без выходных</span></p>
              {/* {workinghours} */}
            </div>
            <div className="salon-card__parking">
              {parking}
            </div>
            <div className="salon-card__telephone">
              <div>Телефон: <span>(495) 123-45-67</span></div>
              {/* {telephone} */}
            </div>
            <div className="salon-card__salon-page-link">
              <a href="#">Подробная информация о салоне</a>
              {/* {detailedInformation} */}
            </div>

            <div className="salon-card__buttons">
              <div className="salon-card__wrapp-button">
                <Button
                  background='#410935'
                >
                  Позвонить
                </Button>
              </div>
              <div className="salon-card__wrapp-button">
                <Button
                  background='#A40123'
                >
                  Записаться
                </Button>
              </div>
            </div>

          </div>
          <div className="salon-card__services">
            <p className="salon-card__services-title">
              Услуги салона
            </p>
            <div className="salon-card__wrapp-services-list">
              <ServicesList
                services={['Косметология', 'Парикмахерские услуги', 'Макияж / брови / ресницы', 'Массаж и коррекция фигуры', 'Ногтевой сервис', 'Трихология']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SalonCard.propTypes = {
  salonTitle: propTypes.string,
  address: propTypes.string,
  workinghours: propTypes.string,
  telephone: propTypes.string,
  pathImg: propTypes.string,
}

SalonCard.defaultProps = {
  salonTitle: '-',
  address: '-',
  workinghours: '-',
  telephone: '-',
  pathImg: '',
}

export default React.memo(SalonCard);