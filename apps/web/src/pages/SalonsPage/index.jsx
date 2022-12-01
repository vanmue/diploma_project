import { useState } from 'react';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownSelect from '../../Components/DropdownSelect';
import SalonCard from '../../Components/SalonCard';
import YandexMap from '../../Components/YandexMap';
import Pagination from '../../Components/Pagination';
import Button from '../../Components/Button';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction
} from '../../actions/stylesActions';
import {
  setActiveSalonIdAction,
  getFilteringSalonsThunk,
} from '../../actions/salonsAction';
import { getAllServiceGroupsThunk } from '../../actions/deliverablesActions';
import { getCitiesThunk } from '../../actions/citiesActions';
import './salons-page.scss';

function SalonsPage() {

  const select = useSelector(store => ({
    cities: store.citiesReducer.cities,
    groupsServices: store.deliverablesReducer.serviceGroups,
    salons: store.salonsReducer.salons,
  }));

  const [cityId, setCitiesId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changingLabelInHeaderAction(false));
    dispatch(changeHeaderBackgroundAction('#F5BFAB'));
    dispatch(changeNavigationColorAction('#410935'));

    dispatch(getCitiesThunk());
    dispatch(getAllServiceGroupsThunk());
    dispatch(getFilteringSalonsThunk(cityId, serviceId));
  }, []);



  const renders = {
    yandexMap: <YandexMap center={[53.21624037527426, 50.13260255066459]}
      zoom={12} items={[[53.21624037527426, 50.13260255066459],]} />
  }

  const callbacks = {
    onSetCitiesId: useCallback(id => {
      setCitiesId(id)
    }),
    onSetServiceId: useCallback(id => {
      setServiceId(id)
    }),
    onSetActiveSalonId: useCallback((id) => {
      dispatch(setActiveSalonIdAction(id));
    }),
    onGetFilteringSalons: useCallback(() => {
      dispatch(getFilteringSalonsThunk(cityId, serviceId));
    }),
    onGetActivePageForSalons: useCallback((numberPage) => {
      dispatch(getFilteringSalonsThunk(cityId, serviceId, numberPage));
    }),
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
                  what='cities'
                  dropdownTitle={'Выберите город'}
                  items={select.cities}
                  onChange={callbacks.onSetCitiesId}
                />
              </div>
              <div className="salons-page__wrapp-drodown-select">
                <DropdownSelect
                  dropdownTitle={'Выберите услугу'}
                  items={select.groupsServices}
                  onChange={callbacks.onSetServiceId}
                />
              </div>
              <Button
                colorText='#F5BFAB'
                background='#A40123'
                onClick={callbacks.onGetFilteringSalons}
              >
                Поиск
              </Button>
            </div>
          </section>
          <ul className="salons-page__salons-list">
            {select.salons?.map((item) => {
              let imgPreview = item.images.length > 0 ? item.images.find(el => el.is_preview == true) : '';
              return <li className="salons-page__wrapp-salon-card" data-salon-id={item.id} key={item.id}>
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
                  img={imgPreview != '' ? imgPreview.img : ''}
                  bckCallBtn={'#410935'}
                  colorTextCallBtn={'#F5BFAB'}
                  bkgRecordBtn={'#A40123'}
                  colorTextRecordBtn={'#F5BFAB'}
                  onClick={callbacks.onSetActiveSalonId}
                />
              </li>
            })}
          </ul>
          <div className="salons-page__wrapp-pagination">
            <Pagination
              onClick={callbacks.onGetActivePageForSalons}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SalonsPage);