import React from 'react';
import Services from '../../components/Services';
import yandexMap from './img/yandex-map.jpg'
import './main-page.scss';

function MainPage() {
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
        <div className="container">
          <div className="main-page__yandex-map-body">
            <img className='main-page__yandex-map-img' src={yandexMap} alt="Карта яндекс" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default React.memo(MainPage);