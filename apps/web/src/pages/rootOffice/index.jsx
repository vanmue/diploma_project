import React from "react";
import { useSelector } from "react-redux";
import propTypes from 'prop-types';
import DrpdnForAddSalons from "../../Components/DrpdnForAddSalons";
import './root-office.scss'

function RootOffice({
}) {

  const select = useSelector(store => ({

  }));

  const handleCkickClose = () => {

  }

  return (
    <div className="root-office">
      {/* <div className="salon-admine-office__editing-salon">
        <div
          className="salon-admine-office__editing-salon-close"
          onClick={handleCkickClose}
        ></div>
        <div className="salon-admine-office__editing-salon-name salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-name-label"
            htmlFor="salon-name">
            Название салона:
          </label>
          <input
            id="salon-name"
            className="salon-admine-office__editing-salon-name-input"
            name="name"
            type="text"
          // onChange={handleChangeTextareaModalNewSalon}
          />
        </div>

        <div className="salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-city-label">
            Город:
          </label>
          <div className="salon-admine-office__wrapp-drpdn-add-salon">
            <DrpdnForAddSalons
              items={select.cities}
              onChange={callbacks.onSetCitiesId}
            />
          </div>
        </div>

        <div className="salon-admine-office__editing-salon-address salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-address-label"
            htmlFor="salon-address">
            Адрес:
          </label>
          <input
            id="salon-address"
            className="salon-admine-office__editing-salon-address-input"
            name="address"
            type="text"
            onChange={handleChangeTextareaModalNewSalon}
          />
        </div>
        <div className="salon-admine-office__editing-salon-working-hours salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-working-hours-label"
            htmlFor="salon-working-hours">
            Время работы:
          </label>
          <input
            id="salon-working-hours"
            className="salon-admine-office__editing-salon-working-hours-input"
            name="working-hours"
            type="text"
            onChange={handleChangeTextareaModalNewSalon}
          />
        </div>
        <div className="salon-admine-office__editing-salon-working-start salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-working-start-label"
            htmlFor="salon-working-start">
            Начало работы:
          </label>
          <input
            id="salon-working-start"
            className="salon-admine-office__editing-salon-working-start-input"
            name="working-start"
            type="text"
            onChange={handleChangeTextareaModalNewSalon}
          />
        </div>
        <div className="salon-admine-office__editing-salon-working-end salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-working-end-label"
            htmlFor="salon-working-end">
            Конец работы:
          </label>
          <input
            id="salon-working-end"
            className="salon-admine-office__editing-salon-working-end-input"
            name="working-end"
            type="text"
            onChange={handleChangeTextareaModalNewSalon}
          />
        </div>

        <div className="salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-advantages-label">
            Преимущества:
          </label>
          <div className="salon-admine-office__wrapp-drpdn-add-salon">
            <DrpdnForAddSalons
              items={select.advantages}
              onChange={callbacks.onSetАdvantagesId}
            />
          </div>
        </div>


        <div className="salon-admine-office__editing-salon-telephone salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-telephone-label"
            htmlFor="salon-telephone">
            Телефон:
          </label>
          <input
            id="salon-telephone"
            className="salon-admine-office__editing-salon-telephone-input"
            name="telephone"
            type="text"
            onChange={handleChangeTextareaModalNewSalon}
          />
        </div>
        <div className="salon-admine-office__editing-salon-latitude-center salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-latitude-center-label"
            htmlFor="salon-latitude-center">
            Геог-кая широта центра карты:
          </label>
          <input
            id="salon-latitude-center"
            className="salon-admine-office__editing-salon-latitude-center-input"
            name="latitude-center"
            type="text"
            onChange={handleChangeTextareaModalNewSalon}
          />
        </div>
        <div className="salon-admine-office__editing-salon-longtitude-center salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-longtitude-center-label"
            htmlFor="salon-longtitude-center">
            Геог-кая долгота центра карты:
          </label>
          <input
            id="salon-longtitude-center"
            className="salon-admine-office__editing-salon-longtitude-center-input"
            name="longtitude-center"
            type="text"
            onChange={handleChangeTextareaModalNewSalon}
          />
        </div>
        <div className="salon-admine-office__editing-salon-latitude-placemark salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-latitude-placemark-label"
            htmlFor="salon-latitude-placemark">
            Геог-кая широта метки:
          </label>
          <input
            id="salon-latitude-placemark"
            className="salon-admine-office__editing-salon-latitude-placemark-input"
            name="latitude-placemark"
            type="text"
            onChange={handleChangeTextareaModalNewSalon}
          />
        </div>
        <div className="salon-admine-office__editing-salon-longitude-placemark salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-longitude-placemark-label"
            htmlFor="salon-longitude-placemark">
            Геог-кая долгота метки:
          </label>
          <input
            id="salon-longitude-placemark"
            className="salon-admine-office__editing-salon-longitude-placemark-input"
            name="longitude-placemark"
            type="text"
            onChange={handleChangeTextareaModalNewSalon}
          />
        </div>
        <div className="salon-admine-office__editing-salon-zoom salon-admine-office__editing-salon-item">
          <label
            className="salon-admine-office__editing-salon-zoom-label"
            htmlFor="salon-zoom">
            Масштаб:
          </label>
          <input
            id="salon-zoom"
            className="salon-admine-office__editing-salon-zoom-input"
            name="zoom"
            type="text"
            onChange={handleChangeTextareaModalNewSalon}
          />
        </div>
        <div className="salon-admine-office__editing-salon-wrapp-button">
          <Button
            background={"#410935"}
            colorText={"#FFFFFF"}
            onClick={callbacks.onPostNewSalon}
          >Сохранить</Button>
        </div>
      </div> */}
    </div>
  )
}

RootOffice.propTypes = {
}

RootOffice.defaultProps = {
}

export default React.memo(RootOffice);