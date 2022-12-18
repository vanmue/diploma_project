import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCitiesThunk, getCitiesByIdThunk } from "../../actions/citiesActions";
import { getAllServiceGroupsThunk } from '../../actions/deliverablesActions';
import ServicesCard from '../../Components/ServicesCard';
import Select from '../../Components/Select';
import YandexMap from '../../Components/YandexMap';

import './main-page.scss';
import { useCallback } from 'react';

function MainPage() {

  const dispatch = useDispatch();

  const select = useSelector(store => ({
    serviceGroups: store.deliverablesReducer.serviceGroups,
    cities: store.citiesReducer.cities,
    city: store.citiesReducer.city,
  }));

  //[[]] - маркеры салонов(с широтой и долготой)
  const [salonsLabel, setSalonsLabel] = useState(null);

  useEffect(() => {
    dispatch(getCitiesThunk());
    dispatch(getAllServiceGroupsThunk());

    //Получение всех салонов
    fetch('/api/v1/shops')
      .then(req => req.json())
      .then(res => {
        // console.log('MainPage fetch("/api/v1/shops") res:', res.data);
        let labels = res.data.map(el => {

          return [el.label_latitude, el.label_longtitude]
        });
        // console.log('MainPage labels:', labels);
        setSalonsLabel(labels);
      })
      .catch(err => console.log('getAllSalonsThunk: ', err));

  }, []);

  useEffect(() => {
    // console.log("select.city", select.city)
  }, [select.city])

  const callbacks = {
    //Получение информации о городе по его id
    onGetCityById: useCallback((id) => {
      dispatch(getCitiesByIdThunk(+id));
    })
  }

  return (
    <div className='main-page'>
      <div className="main-page__insert">
        <div className="main-page__insert-title">
          <h1 className='main-page__h1'>Онлайн запись</h1>
          <p>В салон красоты на любую услугу к лучшим мастерам</p>
        </div>
      </div>
      <div className="main-page__services">
        <div className="container">
          <div className="main-page__services-body">
            <div className="main-page__services-desc">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu nibh vitae amet. Ipsum, pharetra donec ornare velit. Id at quisque accumsan risus ac ipsum ut. Sit elit, facilisi proin non malesuada sociis tristique. Viverra augue lorem ut quisque quam tortor, malesuada iaculis.
              </p>
              <p>
                Et elementum at nulla venenatis, faucibus integer. Auctor neque eros, viverra rutrum. Fames ultrices condimentum tortor nec penatibus. Velit imperdiet sapien fringilla vestibulum sit fames.
              </p>
            </div>
            <h2 className="main-page__services-h2">Услуги</h2>
            <div className="main-page__services-list">
              {select.serviceGroups?.map(item => {
                return <div
                  className="main-page__wrapp-services-card"
                  data-service-group={item?.id}
                  key={item?.id}
                >
                  <ServicesCard
                    title={item?.name}
                    pathImg={item?.image.path}
                  />
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h3 className="main-page__h3">
          Найди ближайший салон
        </h3>
      </div>
      <div className="container">
        <div className="main-page__wrapp-select">

          <Select
            dropdownTitle={"Выберите город"}
            items={select.cities}
            onChange={callbacks.onGetCityById}
          />
        </div>
      </div>
      <section className='main-page__yandex-map'>
        <h4>Яндекс карта</h4>
        {/* <YandexMap
          center={select.city ? [select.city?.center_latitude, select.city?.center_longtitude] : [55.75244503863624, 37.62277964550782]}
          zoom={10}
          items={salonsLabel}
        /> */}
      </section>
    </div>
  )
}

export default React.memo(MainPage);