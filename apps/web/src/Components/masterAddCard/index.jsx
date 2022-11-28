import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import Button from '../Button';
import imgCam from './img/camera.png';
import './master-add-card.scss';

function MasterAddCard() {

  return (
    <div className="master-add-card">
      <div className="master-add-card__title">
        Добавить мастера:
      </div>
      <div className="master-add-card__flex">
        <div className="master-add-card__img-upload">

          <div className="master-add-card__img-upload-pic">
            <img className="master-add-card__img-upload-pic-pic" src={imgCam} alt="Фотоаппарат" />
            <p className="master-add-card__img-upload-desc">Добавить фото</p>
          </div>

          <input className="master-add-card__img-upload-input" src="" type="file" alt="Загрузка фото" />
        </div>

        <div className="master-add-card__info">
          <div className="master-add-card__info-name master-add-card__info-item">
            <label
              className="master-add-card__info-name-label"
              htmlFor="master-name"
            >
              Имя:
            </label>
            <input
              id="master-name"
              className="master-add-card__info-name-input"
              name="name"
              type="text"
            />
          </div>

          <div className="master-add-card__info-surname master-add-card__info-item">
            <label
              className="master-add-card__info-surname-label"
              htmlFor="master-surname"
            >
              Фамилия:
            </label>
            <input
              id="master-surname"
              className="master-add-card__info-surname-input"
              name="surname"
              type="text"
            />
          </div>

          <div className="master-add-card__info-desk master-add-card__info-item">
            <label
              className="master-add-card__info-desk-label"
              htmlFor="master-desk"
            >
              Описание:
            </label>
            <textarea
              id="master-desk"
              className="master-add-card__info-desk-textarea"
              // rows="5"
              // cols="33"
              name="desk"
            />
          </div>

          <div className="master-add-card__info-services master-add-card__info-item">
            <div
              className="master-add-card__info-services-label"
            // htmlFor="master-service"
            >
              Услуги мастера:
            </div>
            <div
              // id="master-services"
              className="master-add-card__info-services-flex"
              name="services"
            >
              <div className="master-add-card__info-services-services ">
                <input
                  id="master-service-1"
                  className="master-add-card__info-services-service"
                  type="text" />
                <input
                  id="master-service-2"
                  className="master-add-card__info-services-service"
                  type="text" />
                <input
                  id="master-service-3"
                  className="master-add-card__info-services-service"
                  type="text" />
              </div>
              <div className="master-add-card__info-services-prices">
                <div className="master-add-card__info-services-prices-title">
                  Стоимость:
                </div>
                <div className="master-add-card__info-services-prices-prices">
                  <input
                    id="master-service-price-1"
                    className="master-add-card__info-services-prices-input"
                    type="text" />
                  <input
                    id="master-service-price-2"
                    className="master-add-card__info-services-prices-input"
                    type="text" />
                  <input
                    id="master-service-price-3"
                    className="master-add-card__info-services-prices-input"
                    type="text" />

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="master-add-card__wrapp-button">
        <Button
          background={"#410935"}
          colorText={"#FFFFFF"}
        >Сохранить</Button>
      </div>

    </div>
  )
}

MasterAddCard.propTypes = {

}

MasterAddCard.defaultProps = {

}

export default React.memo(MasterAddCard);