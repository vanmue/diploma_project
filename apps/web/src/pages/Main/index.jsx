import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ServicesCard from '../../Components/ServicesCard';
import Select from '../../Components/Select';
import YandexMap from '../../Components/YandexMap';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction
} from '../../actions/stylesActions';
import { useDispatch } from 'react-redux';
import './main-page.scss';

function MainPage() {

  const [listServices, setListServices] = useState([]);
  const cities = useSelector(store => store.citiesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/v1/deliverable-groups')
      .then(res => res.json())
      .then(data => setListServices(data.data))

    dispatch(changingLabelInHeaderAction(true));
    dispatch(changeHeaderBackgroundAction('rgba(65, 9, 53, 0.7)'));
    dispatch(changeNavigationColorAction('#FFFFFF'));
  }, []);

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
            <h3 className="main-page__services-h3">Найди своего мастера</h3>
            <div className="main-page__wrapp-select">
              <Select
                titleSelect={"Выберите город"}
                cities={cities.cities}
              />
            </div>
            <h2 className="main-page__services-h2">Услуги</h2>
            <div className="main-page__services-list">
              {listServices.map(item => {
                return <div
                  className="main-page__wrapp-services-card"
                  key={item.id}
                >
                  <ServicesCard
                    title={item.name}
                    pathImg={item.image}
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
      <section className='main-page__yandex-map'>
        <h4>Яндекс карта</h4>
        <YandexMap
          center={[53.21624037527426, 50.13260255066459]}
          zoom={12}
          items={[
            [53.21624037527426, 50.13260255066459],
            [53.20634751797308, 50.109599926152896],
            [53.192707013386844, 50.132120577752055]
          ]}
        />
      </section>
    </div>
  )
}

export default React.memo(MainPage);