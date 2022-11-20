import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import ServicesList from '../ServicesList';
import Button from '../Button';
import './salon-card.scss';

function SalonCard({
  salonTitle,
  city,
  colorTitle,
  bkgInfo,
  address,
  workinghours,
  telephone,
  parking,
  textLink,
  deliverableGgroups,
  bckCallBtn,
  colorTextCallBtn,
  bkgRecordBtn,
  colorTextRecordBtn,
  img,
  map
}) {

  return (
    <div className="salon-card">
      <div className="salon-card__img">
        {img ? <img src={img} alt="Фото салона" /> : map}
      </div>
      <div
        className="salon-card__info"
        style={{ background: bkgInfo }}
      >
        <p
          className="salon-card__title"
          style={{ color: colorTitle }}
        >
          {salonTitle}
        </p>
        <div
          className="salon-card__info-flex"
          style={{ color: colorTitle }}
        >
          <div
            className="salon-card__service-information">
            <div className="salon-card__address">
              {city.name} {address}
            </div>
            <div className="salon-card__working-hours">
              <p>Время работы: {workinghours}</p>
              {/* <p>Время работы: c <span>10:00</span> до <span>20:00</span> <span>без выходных</span></p> */}
            </div>
            <div className="salon-card__parking">
              {parking}
            </div>
            <div className="salon-card__telephone"
              style={{ marginBottom: textLink ? "20px" : "57px" }}
            >
              Телефон: {telephone}
              {/* <div>Телефон: <span>(495) 123-45-67</span></div> */}
            </div>
            {textLink ? (<div className="salon-card__salon-page-link" style={{ marginBottom: "20px" }}>
              <Link to="/salon">{textLink}</Link>
            </div>) : ''}


            <div className="salon-card__buttons">
              <div className="salon-card__wrapp-button">
                <Button
                  background={bckCallBtn}
                  colorText={colorTextCallBtn}
                >
                  Позвонить
                </Button>
              </div>
              <div className="salon-card__wrapp-button">
                <Button
                  background={bkgRecordBtn}
                  colorText={colorTextRecordBtn}
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
                services={deliverableGgroups}
                color={colorTitle}
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
  city: propTypes.object,
  bkgInfo: propTypes.string,
  address: propTypes.string,
  workinghours: propTypes.string,
  telephone: propTypes.string,
  deliverableGgroups: propTypes.arrayOf(propTypes.object),
  // parking: propTypes.array,
  // parking: propTypes.string,
  img: propTypes.string,
  map: propTypes.element,
}

SalonCard.defaultProps = {
  salonTitle: '-',
  city: {},
  address: '-',
  workinghours: '-',
  telephone: '-',
  deliverableGgroups: [{}],
  // img: '',
  // map: '',
}

export default React.memo(SalonCard);