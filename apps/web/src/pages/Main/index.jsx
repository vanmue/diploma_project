import React, { useState } from 'react';
import ListOfMasters from '../../Components/ListOfMasters';
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

  return (
    <div className='main'>
      <section className='main__welcom'>
        <p className='main__welcom-text'>
          Салон красоты «Delote-Beauty» на Крестовском
        </p>
      </section>
      <section className='main__wrapp-list-of-masters'>
        <ListOfMasters masters={masters} />
      </section>
    </div>
  )
}

export default React.memo(Main);