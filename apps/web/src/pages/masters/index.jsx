import React, { useEffect } from 'react';
import DropdownSelect from '../../Components/DropdownSelect';
import MasterCard from '../../Components/MasterCard';
import Pagination from '../../Components/Pagination';
import master1 from './img/master-1.jpg';
import master2 from './img/master-2.jpg';
import master3 from './img/master-3.jpg';
import './masters.scss';

function MastersPage() {

  return (
    <div className='masters-page'>
      <div className="container">
        <div className="masters-page__body">
          <h1 className="masters-page__h1">Найти мастера</h1>
          <section className="masters-page__search-dropdowns">
            <h2 className="masters-page__search-dropdowns-h2">Секция поиска мастеров</h2>
            <div className="masters-page__wrapp-dropdown-select">
              <DropdownSelect
                dropdownTitle={'Выберите город'}
                items={['Москва', 'Санкт-Петербург', 'Нижний Новгород', 'Новосибирск', 'Новосибирск']}
              />
            </div>
            <div className="masters-page__wrapp-dropdown-select">
              <DropdownSelect
                dropdownTitle={'Выберите услугу'}
                items={['Парикмахерские услуги', 'Маникюр', 'Педикюр', 'Брови и ресницы',]}
              />
            </div>
            <div className="masters-page__wrapp-dropdown-select">
              <DropdownSelect
                dropdownTitle={'Выберите Салон красоты'}
                items={['Салон-красоты «Версаль»', 'Салон-красоты «Лето»', 'Студия маникюра «Чародейка»', 'SPA салон «Клеопатра»',]}
              />
            </div>
          </section>
          <section className="masters-page__masters">
            <h2 className="masters-page__masters-h2">Секция мастеров</h2>
            <ul className="masters-page__list">
              <li className="masters-page__wrapp-master-card">
                <MasterCard
                  pathImg={master1}
                  name={'Светлана Иванова'}
                  specialization={'мастер парикмахер'}
                  salon={'Салон красоты «Версаль»'}
                />
              </li>
              <li className="masters-page__wrapp-master-card">
                <MasterCard
                  pathImg={master2}
                  name={'Наталья Петрова'}
                  specialization={'мастер визажист'}
                  salon={'Салон красоты «Версаль»'}
                />
              </li>
              <li className="masters-page__wrapp-master-card">
                <MasterCard
                  pathImg={master3}
                  name={'Марина Светлова '}
                  specialization={'мастер маникюра'}
                  salon={'Салон красоты «Версаль»'}
                />
              </li>
            </ul>

          </section>
          <div className="masters-page__wrapp-pagination">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MastersPage);