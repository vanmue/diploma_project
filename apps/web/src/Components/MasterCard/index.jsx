import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import Rating from '../Rating';
import Button from '../Button';
import { setIdActiveMasterAction } from '../../actions/masterIdAction';
import './master-card.scss';

function MasterCard({
  name,
  surname,
  rating,
  salon,
  pathImg,
  specialization,
  description,
  textBtn,
  colorTextBtnRecord,
  colorBkgBtnRecord,
  linkTo,
  onClick
}) {
  const dispatch = useDispatch();

  const handleClickDeleteMaster = (e) => {
    let masterId = e.currentTarget.closest(".wrapp-master-card")?.dataset.masterId;
    onClick(masterId);
  }

  const callbacks = {
    onSetIdActiveMaster: useCallback((e) => {
      let masterId = e.currentTarget.closest(".wrapp-master-card")?.dataset.masterId;
      let salonId = e.currentTarget.closest(".wrapp-master-card")?.dataset.salonId;
      dispatch(setIdActiveMasterAction(masterId, salonId));
    })
  }

  return (
    <div className='master-card'>
      <div className="master-card__foto">
        <img className="master-card__foto-foto" src={pathImg} alt="Фото мастера" />
      </div>
      <div className="master-card__info">
        <div className="master-card__title">
          <p className="master-card__name">
            {name}  {surname}
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
              rating={rating}
            />
          </div>

          <div className="master-card__place-work">
            <p className="master-card__place-work-text">Работает в салоне:&nbsp;</p>
            <p className="master-card__place-work-salon">{salon}</p>
          </div>

          <div className="master-card__info-desk">
            <p>{description}</p>
          </div>
          <div className="master-card__wrapp-button">
            <Button
              colorText={colorTextBtnRecord}
              background={colorBkgBtnRecord}
              linkTo={linkTo}
              onClick={onClick ? handleClickDeleteMaster : callbacks.onSetIdActiveMaster}
            >
              {textBtn}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

MasterCard.propTypes = {
  name: propTypes.string,
  surname: propTypes.string,
  rating: propTypes.number,
  salon: propTypes.string,
  pathImg: propTypes.string,
  specialization: propTypes.string,
  description: propTypes.string,
  textBtn: propTypes.string,
  colorText: propTypes.string,
  background: propTypes.string,
  linkTo: propTypes.string,
  onClick: propTypes.func,
}

MasterCard.defaultProps = {
  name: '-',
  surname: '-',
  salon: '-',
  specialization: '-',
  description: '-',
  // onClick: () => { },
}

export default React.memo(MasterCard);