import React, { useEffect } from 'react';
import Services from '../../components/Services';
import YandexMap from '../../components/YandexMap';
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
          <p>В салон красоты на любую услугу к лучшим матерам</p>
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
        <YandexMap />
      </section>
    </div>
  )
}

export default React.memo(MainPage);