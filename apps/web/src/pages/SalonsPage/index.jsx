import React, {
  useEffect
} from 'react';
import { useDispatch } from 'react-redux';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction
} from '../../actions/stylesActions';
import DropdownSelect from '../../Components/DropdownSelect';
import SalonCard from '../../Components/SalonCard';
import Pagination from '../../Components/Pagination';
import img1 from '../../Components/SalonCard/img/1.jpg';
import img2 from '../../Components/SalonCard/img/2.jpg';
import img3 from '../../Components/SalonCard/img/3.jpg';
import './salons-page.scss';

function SalonsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changingLabelInHeaderAction(false));
    dispatch(changeHeaderBackgroundAction('#F5BFAB'));
    dispatch(changeNavigationColorAction('#410935'));
  }, []);

  return (
    <div className="salons-page">
      <div className="container">
        <div className="salons-page__flex">
          <section className="salons-page__search">
            <h1 className='salons-page__h1'>
              Найти ближайший салон
            </h1>
            <div className="salons-page__search-dropdowns">
              <div className="salons-page__wrapp-drodown-select">
                <DropdownSelect
                  dropdownTitle={'Выберите город'}
                  items={['Москва', 'Б', 'Санкт-Петербург', 'Самара', 'А', 'Нижний Новгород', 'Новосибирск', 'Новосибирск']}
                />
              </div>
              <div className="salons-page__wrapp-drodown-select">
                <DropdownSelect
                  dropdownTitle={'Выберите Салон красоты'}
                  items={['Салон-красоты «Версаль»', 'Салон-красоты «Лето»', 'Студия маникюра «Чародейка»', 'SPA салон «Клеопатра»',]}
                />
              </div>
              <div className="salons-page__wrapp-drodown-select">
                <DropdownSelect
                  dropdownTitle={'Выберите услугу'}
                  items={['Парикмахерские услуги', 'Маникюр', 'Педикюр', 'Брови и ресницы',]}
                />
              </div>
            </div>
          </section>
          <ul className="salons-page__salons-list">
            <li className="salons-page__wrapp-salon-card">
              <SalonCard
                salonTitle={'Салон-красоты «Версаль»'}
                address={'Москва, ул. Костина, 6/1, 3 этаж (м. Красносельская)'}
                workinghours={'Время работы: с 10:00 до 20:00 без выходных'}
                telephone={'Телефон: (495) 123-45-67'}
                detailedInformation={'Подробная информация о салоне'}
                parking={'Бесплатная гостевая парковка'}
                pathImg={img1}
              />
            </li>
            <li className="salons-page__wrapp-salon-card">
              <SalonCard
                salonTitle={'Салон-красоты «Версаль»'}
                address={'Москва, ул. Костина, 6/1, 3 этаж (м. Красносельская)'}
                workinghours={'Время работы: с 10:00 до 20:00 без выходных'}
                telephone={'Телефон: (495) 123-45-67'}
                detailedInformation={'Подробная информация о салоне'}
                parking={'Бесплатная гостевая парковка'}
                pathImg={img2}
              />
            </li>
            <li className="salons-page__wrapp-salon-card">
              <SalonCard
                salonTitle={'Салон-красоты «Версаль»'}
                address={'Москва, ул. Костина, 6/1, 3 этаж (м. Красносельская)'}
                workinghours={'Время работы: с 10:00 до 20:00 без выходных'}
                telephone={'Телефон: (495) 123-45-67'}
                detailedInformation={'Подробная информация о салоне'}
                parking={'Бесплатная гостевая парковка'}
                pathImg={img3}
              />
            </li>
          </ul>
          <div className="salons-page__wrapp-pagination">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SalonsPage);