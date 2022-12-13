import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import propTypes from 'prop-types';
import { postNewSalonThunk, patchDataSalonThunk } from "../../actions/salonsAction";
import { getCitiesThunk } from "../../actions/citiesActions";
import { getAllAdvantagesThunk } from "../../actions/advantagesActions";
import DrpdnForAddSalons from "../../Components/DrpdnForAddSalons";
import Button from "../../Components/Button";
import './form-for-salon.scss'

function FormForSalon({
  salonId,
  salon,
  req,
  onClickClose
}) {

  const select = useSelector(store => ({
    cities: store.citiesReducer.cities,
    advantages: store.advantagesReducer.advantages,
  }));

  const [formNewSalon, setFormNewSalon] = useState(req == "POST" ?
    {
      managers: [],
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
      name: salon.name,
      address: salon.address,
      cityId: 0,
      phone: salon.phone,
      working_time: salon.working_time,
      working_start: salon.working_start,
      working_end: salon.working_end,
      advantages: [],
      center_latitude: salon.center_latitude,
      center_longtitude: salon.center_longtitude,
      label_latitude: salon.label_latitude,
      label_longtitude: salon.label_longtitude,
      zoom: salon.zoom,
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCitiesThunk());
    dispatch(getAllAdvantagesThunk());
  }, []);

  useEffect(() => {
    console.log("FormForSalon salon:", salon)
  }, [salon]);

  const handleCkickClose = () => {
    onClickClose();
  }

  const handleChangeInput = (e) => {
    console.log("onPostNewSalon formNewSalon: ", formNewSalon);
    switch (e.currentTarget.getAttribute("id")) {
      case 'salon-admin':
        setFormNewSalon({
          ...formNewSalon,
          managers: [+e.currentTarget.value]
        });
        // setFormNewSalon({
        //   ...formNewSalon,
        //   managers: [
        //     ...formNewSalon.managers,
        //     +e.currentTarget.value
        //   ]
        // });
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
    onPostNewSalon: useCallback((e) => {

      console.log("onPostNewSalon formNewSalon: ", formNewSalon);
      if (req == "POST") dispatch(postNewSalonThunk(formNewSalon));
      if (req == "PATCH") dispatch(patchDataSalonThunk({ salon: formNewSalon, salonId: +salonId }));
      e.preventDefault();
      e.stopPropagation();
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
      let salonInputValue = (name == "name") ? formNewSalon.name :
        (name == "address") ? formNewSalon.address :
          name == "working-hours" ? formNewSalon.working_time :
            name == "working-start" ? formNewSalon.working_start :
              name == "working-end" ? formNewSalon.working_end :
                name == "telephone" ? formNewSalon.phone :
                  name == "latitude-center" ? formNewSalon.center_latitude :
                    name == "longtitude-center" ? formNewSalon.center_longtitude :
                      name == "latitude-placemark" ? formNewSalon.label_latitude :
                        name == "longitude-placemark" ? formNewSalon.label_longtitude :
                          name == "zoom" ? formNewSalon.zoom :
                            name == "admin" ? formNewSalon.managers : ""

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
          value={salonInputValue ? salonInputValue : ""}
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

        <div className="form-for-salon__editing-salon-wrapp-button">
          <Button
            background={"#410935"}
            colorText={"#FFFFFF"}
            onClick={callbacks.onPostNewSalon}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  )
}

FormForSalon.propTypes = {
  salon: propTypes.object,
  req: propTypes.string.isRequired,
  onClickClose: propTypes.func
}

FormForSalon.defaultProps = {
  salon: null,
  req: "",
  onClickClose: () => { }
}

export default React.memo(FormForSalon);