import React, { useEffect } from 'react';
import Services from '../../Components/Services';
import YandexMap from '../../Components/YandexMap';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction
} from '../../actions/stylesActions';
import { useDispatch } from 'react-redux';
import './main-page.scss';

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
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
      <section className="main-page__wrapp-services">
        <Services />
      </section>
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