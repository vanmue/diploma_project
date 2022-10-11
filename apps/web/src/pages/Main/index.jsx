import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import Services from '../../Components/Services';
import ListOfMasters from '../../Components/ListOfMasters';
import Footer from '../../Components/Footer';
import yandeMap from './img/yandex-map.jpg'
import './main.scss';

function Main() {
  const [masters, setMasters] = useState([
    {
      photoOfMaster: 'https://placehold.co/150x180',
      masterName: 'Анна',
      specializationOfMaster: 'Визажист'
    },
    {
      photoOfMaster: 'https://placehold.co/150x180',
      masterName: 'Алина',
      specializationOfMaster: 'Визажист'
    },
    {
      photoOfMaster: 'https://placehold.co/150x180',
      masterName: 'Нина',
      specializationOfMaster: 'Визажист'
    },
    {
      photoOfMaster: 'https://placehold.co/150x180',
      masterName: 'Малина',
      specializationOfMaster: 'Визажист'
    },
    {
      photoOfMaster: 'https://placehold.co/150x180',
      masterName: 'Вика',
      specializationOfMaster: 'Визажист'
    },
    {
      photoOfMaster: 'https://placehold.co/150x180',
      masterName: 'Дина',
      specializationOfMaster: 'Визажист'
    },
  ]);

  const cities = useSelector(store => store.citiesReducer)

  const [salons, setSalons] = useState(
    [
      'Москва',
      'Питер',
      'Екатеренбург',
      'Самара',
      'Воронеж'
    ]
  );

  return (
    <div className='main'>
      <div className="main__insert">
        <div className="main__insert-title">
          <p>Онлайн запись</p>
          <p>В салон красоты на любую услугу к лучшим матерам</p>
        </div>
      </div>
      <section className="main__wrapp-services">
        <Services />
      </section>
      <div className="container">
        <h3 className="main__h3">
          Найди ближайший салон
        </h3>
      </div>
      <section className='main__yandex-map'>
        <div className="container">
          <div className="main__yandex-map-body">
            <img className='main__yandex-map-img' src={yandeMap} alt="" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default React.memo(Main);