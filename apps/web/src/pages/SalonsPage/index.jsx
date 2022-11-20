import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownSelect from '../../Components/DropdownSelect';
import SalonCard from '../../Components/SalonCard';
import YandexMap from '../../Components/YandexMap';
import Pagination from '../../Components/Pagination';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction
} from '../../actions/stylesActions';
import {
  getSalonsThunk,
  getCitiesThunk,
  getFilteringSalonsByCityThunk
} from '../../actions/salonsAction';
import img1 from '../../Components/SalonCard/img/1.jpg';
import img2 from '../../Components/SalonCard/img/2.jpg';
import img3 from '../../Components/SalonCard/img/3.jpg';
import './salons-page.scss';

function SalonsPage() {
  const dispatch = useDispatch();
  const cities = useSelector(store => store.salonsReducer.cities);
  const salons = useSelector(store => store.salonsReducer.salons);

  useEffect(() => {
    dispatch(changingLabelInHeaderAction(false));
    dispatch(changeHeaderBackgroundAction('#F5BFAB'));
    dispatch(changeNavigationColorAction('#410935'));

    dispatch(getCitiesThunk());
    dispatch(getSalonsThunk());
  }, []);

  const renders = {
    yandexMap: <YandexMap center={[53.21624037527426, 50.13260255066459]}
      zoom={12} items={[[53.21624037527426, 50.13260255066459],]} />
  }

  const callbacks = {
    onGetFilteringSalonsByCity: useCallback(cityId => dispatch(getFilteringSalonsByCityThunk(cityId)))
  }

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
                  items={cities}
                  onChange={callbacks.onGetFilteringSalonsByCity}
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
            {salons.map((item) => {
              return <li className="salons-page__wrapp-salon-card" key={item.id}>
                <SalonCard
                  salonTitle={item.name}
                  colorTitle={'#000000'}
                  bkgInfo={'#F5BFAB'}
                  city={item.city}
                  address={item.address}
                  workinghours={item.working_time}
                  telephone={item.phone}
                  parking={item.advantages[0]?.name}
                  textLink={'Подробная информация о салоне'}
                  deliverableGgroups={item.deliverable_groups}
                  img={img1}//
                  bckCallBtn={'#410935'}
                  colorTextCallBtn={'#F5BFAB'}
                  bkgRecordBtn={'#A40123'}
                  colorTextRecordBtn={'#F5BFAB'}
                />
              </li>
            })}
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