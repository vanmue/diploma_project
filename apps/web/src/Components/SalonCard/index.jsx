import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import ServicesList from '../ServicesList';
import Button from '../Button';
import { setActiveSalonIdAction } from '../../actions/salonsAction';
import pencil from "./img/pencil.png";
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
  map,
  isEdited,
  onClick,
  onClickEditing
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickLink = (e) => {
    if (typeof onClick == 'function') {
      let id = e.currentTarget.closest('.salons-page__wrapp-salon-card').dataset.salonId;
      onClick(id);
    }
  }

  const handleClickBtnEditing = () => {
    onClickEditing();
  }

  const callbacks = {
    onSetActiveSalonId: useCallback((e) => {
      let salonId = e.currentTarget.closest('.salons-page__wrapp-salon-card').dataset.salonId;
      navigate("/salon", { state: { activeSalonId: salonId } })
      dispatch(setActiveSalonIdAction(salonId));
    }),
  }

  return (
    <div className="salon-card">
      <div className="salon-card__img">
        {img ? <img src={img} alt="Фото салона" /> : map ? map : ""}
        {/* {img ? <img src={img} alt="Фото салона" /> : map } */}
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
            </div>
            <div className="salon-card__parking">
              {parking}
            </div>
            <div className="salon-card__telephone"
              style={{ marginBottom: textLink ? "20px" : "57px" }}
            >
              Телефон: {telephone}
            </div>
            {textLink ? (<div className="salon-card__salon-page-link" style={{ marginBottom: "20px" }} onClick={handleClickLink}>
              <Link to="/salon">{textLink}</Link>
            </div>) : ''}
            {isEdited ? <div className="salon-card__edited">
              <img src={pencil} alt="" />
              <button onClick={handleClickBtnEditing} className="salon-card__edited-btn">Изменить данные</button>
            </div> :
              <div className="salon-card__buttons">
                <div className="salon-card__wrapp-button">
                  <Button
                    colorText={colorTextCallBtn}
                    background={bckCallBtn}
                  >
                    Позвонить
                  </Button>
                </div>
                {/* <div className="salon-card__wrapp-button">
                  <Button
                    colorText={colorTextRecordBtn}
                    background={bkgRecordBtn}
                    // linkTo={'/salon'}
                    onClick={callbacks.onSetActiveSalonId}
                  >
                    Записаться
                  </Button>
                </div> */}
              </div>}
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
  colorTitle: propTypes.string,
  bkgInfo: propTypes.string,
  address: propTypes.string,
  workinghours: propTypes.string,
  telephone: propTypes.string,
  parking: propTypes.string,
  textLink: propTypes.string,
  deliverableGgroups: propTypes.arrayOf(propTypes.object),
  bckCallBtn: propTypes.string,
  colorTextCallBtn: propTypes.string,
  bkgRecordBtn: propTypes.string,
  colorTextRecordBtn: propTypes.string,
  img: propTypes.string,
  map: propTypes.element,
  isEdited: propTypes.bool,
  onClick: propTypes.func,
  onClickEditing: propTypes.func,
}

SalonCard.defaultProps = {
  salonTitle: '-',
  city: {},
  address: '-',
  workinghours: '-',
  telephone: '-',
  deliverableGgroups: [{}],
  isEdited: false,
  onClick: () => { },
  onClickEditing: () => { },
  img: '',
  map: <></>,
}

export default React.memo(SalonCard);