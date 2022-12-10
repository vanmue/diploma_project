import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import propTypes from 'prop-types';
import { postNewSalonThunk, patchSalonThunk } from "../../actions/salonsAction";
import { getCitiesThunk } from "../../actions/citiesActions";
import { getAllAdvantagesThunk } from "../../actions/advantagesActions";
import DrpdnForAddSalons from "../../Components/DrpdnForAddSalons";
import Button from "../../Components/Button";
import './form-for-salon.scss'

function FormForSalon({
  req,
  onClickClose
}) {

  const select = useSelector(store => ({
    cities: store.citiesReducer.cities,
    advantages: store.advantagesReducer.advantages,
  }));

  const [formNewSalon, setFormNewSalon] = useState(req == "POST" ?
    {
      id: null,
      name: null,
      address: null,
      cityId: 0,
      phone: null,
      working_time: null,
      working_start: null,
      working_end: null,
      advantages: [],
      center_latitude: 0,
      center_longtitude: 0,
      label_latitude: 0,
      label_longtitude: 0,
      zoom: null,
    } :
    {
      name: null,
      address: null,
      cityId: 0,
      phone: null,
      working_time: null,
      working_start: null,
      working_end: null,
      advantages: [],
      center_latitude: 0,
      center_longtitude: 0,
      label_latitude: 0,
      label_longtitude: 0,
      zoom: null,
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCitiesThunk());
    dispatch(getAllAdvantagesThunk());
  }, []);

  const handleCkickClose = () => {
    onClickClose();
  }

  const handleChangeInput = (e) => {
    console.log("onPostNewSalon formNewSalon: ", formNewSalon);
    switch (e.currentTarget.getAttribute("id")) {
      case 'salon-admin':
        setFormNewSalon({ ...formNewSalon, id: +e.currentTarget.value });
        break;
      case 'salon-name':
        setFormNewSalon({ ...formNewSalon, name: e.currentTarget.value });
        break;
      case 'salon-address':
        setFormNewSalon({ ...formNewSalon, address: e.currentTarget.value });
        break;
      case 'salon-working-hours':
        setFormNewSalon({ ...formNewSalon, working_time: e.currentTarget.value });
        break;
      case 'salon-working-start':
        setFormNewSalon({ ...formNewSalon, working_start: e.currentTarget.value });
        break;
      case 'salon-working-end':
        setFormNewSalon({ ...formNewSalon, working_end: e.currentTarget.value });
        break;
      case 'salon-telephone':
        setFormNewSalon({ ...formNewSalon, phone: e.currentTarget.value });
        break;
      case 'salon-latitude-center':
        setFormNewSalon({ ...formNewSalon, center_latitude: e.currentTarget.value });
        break;
      case 'salon-longtitude-center':
        setFormNewSalon({ ...formNewSalon, center_longtitude: e.currentTarget.value });
        break;
      case 'salon-latitude-placemark':
        setFormNewSalon({ ...formNewSalon, label_latitude: e.currentTarget.value });
        break;
      case 'salon-longitude-placemark':
        setFormNewSalon({ ...formNewSalon, label_longtitude: e.currentTarget.value });
        break;
      case 'salon-zoom':
        setFormNewSalon({ ...formNewSalon, zoom: e.currentTarget.value });
        break;
      default: break;
    }
  }

  const callbacks = {
    onSetCitiesId: useCallback((id) => setFormNewSalon({ ...formNewSalon, cityId: Number(id) })),
    onPostNewSalon: useCallback(() => {
      console.log("onPostNewSalon formNewSalon: ", formNewSalon);
      if (req == "POST") dispatch(postNewSalonThunk(formNewSalon));
      if (req == "PATCH") dispatch(patchSalonThunk(formNewSalon));
    }),
    onSetАdvantagesId: useCallback((id) => {
      let arrAdv = formNewSalon.advantages;
      arrAdv.push(id);
      setFormNewSalon({ ...formNewSalon, advantages: arrAdv })
    }),
  }

  const renders = {
    formForSalonFormFields: (name, label) => {

      let headClass = `form-for-salon__editing-salon-${name} form-for-salon__editing-salon-item`;
      let labelClass = `form-for-salon__editing-salon-${name}-label`;
      let labelFor = `salon-${name}`;
      let inputId = `salon-${name}`;
      let inputClass = `form-for-salon__editing-salon-${name}-input`;
      let inputName = `salon-${name}`;

      return <div className={headClass}>
        <label
          className={labelClass}
          htmlFor={labelFor}
        >
          {label}:
        </label>
        <input
          id={inputId}
          className={inputClass}
          name={inputName}
          type="text"
          onChange={handleChangeInput}
        />
      </div>
    }
  }

  return (
    <div className="form-for-salon">
      <div className="form-for-salon__editing-salon">
        <div
          className="form-for-salon__editing-salon-close"
          onClick={handleCkickClose}
        ></div>
        {req == "POST" && renders.formForSalonFormFields("admin", "id admin salon")}
        {renders.formForSalonFormFields("name", "Название салона")}
        <div className="form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-city-label">
            Город:
          </label>
          <div className="form-for-salon__wrapp-drpdn-add-salon">
            <DrpdnForAddSalons
              items={select.cities}
              onChange={callbacks.onSetCitiesId}
            />
          </div>
        </div>
        {renders.formForSalonFormFields("address", "Адресс")}
        {renders.formForSalonFormFields("working-hours", "Время работы")}
        {renders.formForSalonFormFields("working-start", "Открываемся в")}
        {renders.formForSalonFormFields("working-end", "Закрываемся в")}
        <div className="form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-advantages-label">
            Преимущества:
          </label>
          <div className="form-for-salon__wrapp-drpdn-add-salon">
            <DrpdnForAddSalons
              items={select.advantages}
              onChange={callbacks.onSetАdvantagesId}
            />
          </div>
        </div>telephone
        {renders.formForSalonFormFields("telephone", "Телефон")}
        {renders.formForSalonFormFields("latitude-center", "Г-ая широта центра карты")}
        {renders.formForSalonFormFields("longtitude-center", "Г-ая долгота центра карты")}
        {renders.formForSalonFormFields("latitude-placemark", "Г-ая широта маркера")}
        {renders.formForSalonFormFields("longitude-placemark", "Г-ая долгота маркера")}
        {renders.formForSalonFormFields("zoom", "Zoom")}










        <>
          {/* {req == "POST" ? <div className="form-for-salon__editing-salon-admin form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-admin-label"
            htmlFor="salon-admin">
            id admin salon:
          </label>
          <input
            id="salon-admin"
            className="form-for-salon__editing-salon-admin-input"
            name="salon-admin"
            type="text"
            onChange={handleChangeInput}
          />
        </div> :
          req == "PATCH" ? "" : ""}


        <div className="form-for-salon__editing-salon-name form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-name-label"
            htmlFor="salon-name">
            Название салона:
          </label>
          <input
            id="salon-name"
            className="form-for-salon__editing-salon-name-input"
            name="name"
            type="text"
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-city-label">
            Город:
          </label>
          <div className="form-for-salon__wrapp-drpdn-add-salon">
            <DrpdnForAddSalons
              items={select.cities}
              onChange={callbacks.onSetCitiesId}
            />
          </div>
        </div>

        <div className="form-for-salon__editing-salon-address form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-address-label"
            htmlFor="salon-address">
            Адрес:
          </label>
          <input
            id="salon-address"
            className="form-for-salon__editing-salon-address-input"
            name="address"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-for-salon__editing-salon-working-hours form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-working-hours-label"
            htmlFor="salon-working-hours">
            Время работы:
          </label>
          <input
            id="salon-working-hours"
            className="form-for-salon__editing-salon-working-hours-input"
            name="working-hours"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-for-salon__editing-salon-working-start form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-working-start-label"
            htmlFor="salon-working-start">
            Начало работы:
          </label>
          <input
            id="salon-working-start"
            className="form-for-salon__editing-salon-working-start-input"
            name="working-start"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-for-salon__editing-salon-working-end form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-working-end-label"
            htmlFor="salon-working-end">
            Конец работы:
          </label>
          <input
            id="salon-working-end"
            className="form-for-salon__editing-salon-working-end-input"
            name="working-end"
            type="text"
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-advantages-label">
            Преимущества:
          </label>
          <div className="form-for-salon__wrapp-drpdn-add-salon">
            <DrpdnForAddSalons
              items={select.advantages}
              onChange={callbacks.onSetАdvantagesId}
            />
          </div>
        </div>


        <div className="form-for-salon__editing-salon-telephone form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-telephone-label"
            htmlFor="salon-telephone">
            Телефон:
          </label>
          <input
            id="salon-telephone"
            className="form-for-salon__editing-salon-telephone-input"
            name="telephone"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-for-salon__editing-salon-latitude-center form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-latitude-center-label"
            htmlFor="salon-latitude-center">
            Геог-кая широта центра карты:
          </label>
          <input
            id="salon-latitude-center"
            className="form-for-salon__editing-salon-latitude-center-input"
            name="latitude-center"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-for-salon__editing-salon-longtitude-center form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-longtitude-center-label"
            htmlFor="salon-longtitude-center">
            Геог-кая долгота центра карты:
          </label>
          <input
            id="salon-longtitude-center"
            className="form-for-salon__editing-salon-longtitude-center-input"
            name="longtitude-center"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-for-salon__editing-salon-latitude-placemark form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-latitude-placemark-label"
            htmlFor="salon-latitude-placemark">
            Геог-кая широта метки:
          </label>
          <input
            id="salon-latitude-placemark"
            className="form-for-salon__editing-salon-latitude-placemark-input"
            name="latitude-placemark"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-for-salon__editing-salon-longitude-placemark form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-longitude-placemark-label"
            htmlFor="salon-longitude-placemark">
            Геог-кая долгота метки:
          </label>
          <input
            id="salon-longitude-placemark"
            className="form-for-salon__editing-salon-longitude-placemark-input"
            name="longitude-placemark"
            type="text"
            onChange={handleChangeInput}
          />
        </div>
        <div className="form-for-salon__editing-salon-zoom form-for-salon__editing-salon-item">
          <label
            className="form-for-salon__editing-salon-zoom-label"
            htmlFor="salon-zoom">
            Масштаб:
          </label>
          <input
            id="salon-zoom"
            className="form-for-salon__editing-salon-zoom-input"
            name="zoom"
            type="text"
            onChange={handleChangeInput}
          />
        </div> */}
        </>
        <div className="form-for-salon__editing-salon-wrapp-button">
          <Button
            background={"#410935"}
            colorText={"#FFFFFF"}
            onClick={callbacks.onPostNewSalon}
          >Сохранить</Button>
        </div>
      </div>
    </div>
  )
}

FormForSalon.propTypes = {
  req: propTypes.string.isRequired,
  onClickClose: propTypes.func
}

FormForSalon.defaultProps = {
  req: "",
  onClickClose: () => { }
}

export default React.memo(FormForSalon);