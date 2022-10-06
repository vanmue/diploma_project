import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import ListOfMasters from '../../Components/ListOfMasters';
import Select from '../../Components/Select';
import './style.css';

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
      <h1 className='main__h1'>Запишись в любой салон красоты</h1>
      <section className='main__search'>
        <div className='main__search-wrapp-select'>
          <Select cities={cities.cities} />
        </div>
      </section>
      <section className='main__wrapp-list-of-masters'>
        <ListOfMasters masters={masters} />
      </section>
    </div>
  )
}

export default React.memo(Main);