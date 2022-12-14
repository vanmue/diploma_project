import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownSelect from '../../Components/DropdownSelect';
import MasterCard from '../../Components/MasterCard';
import Pagination from '../../Components/Pagination';
import Button from '../../Components/Button';
import { getFilteringMastersThunk } from '../../actions/mastersActions';
import { getCitiesThunk } from '../../middlewares/citiesMiddlewares';
import { getAllServiceGroupsThunk } from '../../actions/deliverablesActions';
import { getAllSalonsThunk } from '../../actions/salonsAction';
import './masters.scss';

function MastersPage() {

  const select = useSelector(store => ({
    cities: store.citiesReducer.getCities.data,                       // [{}] - все города
    groupsServices: store.deliverablesReducer.serviceGroups,  // Группы услуг
    allSalons: store.salonsReducer.salons,                    // [{}] - все салоны
    masters: store.mastersReducer.masters,                    // [{}] - все мастера
    pagination: store.mastersReducer.pagination,              // {} - пагинация
  }));

  const [cityId, setCitiesId] = useState(null);               // id города
  const [serviceId, setServiceId] = useState(null);           // id услуги
  const [salonId, setSalonId] = useState(null);               // id салона
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCitiesThunk());
    dispatch(getAllServiceGroupsThunk());
    dispatch(getAllSalonsThunk());
    dispatch(getFilteringMastersThunk());
  }, []);

  useEffect(() => {
  }, [select.masters, select.pagination]);

  const callbacks = {
    onSetCitiesId: useCallback((id) => {
      setCitiesId(id);
    }),
    onSetServicesId: useCallback((id) => {
      setServiceId(id);
    }),
    onSetSalonsId: useCallback((id) => {
      setSalonId(id);
    }),
    onGetFilteringMasters: useCallback(() => {
      // GET запрос за отфильтрованными мастерами
      dispatch(getFilteringMastersThunk(cityId, serviceId, salonId));
    }),
    onGetMastersOnActivePage: useCallback((page) => {
      dispatch(getFilteringMastersThunk(cityId, serviceId, salonId, page));
    })
  }

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
                items={select.cities}
                onChange={callbacks.onSetCitiesId}
              />
            </div>
            <div className="masters-page__wrapp-dropdown-select">
              <DropdownSelect
                dropdownTitle={'Выберите услугу'}
                items={select.groupsServices}
                onChange={callbacks.onSetServicesId}
              />
            </div>
            <div className="masters-page__wrapp-dropdown-select">
              <DropdownSelect
                dropdownTitle={'Выберите Салон красоты'}
                items={select.allSalons}
                onChange={callbacks.onSetSalonsId}
              />
            </div>
            <Button
              colorText={"#F5BFAB"}
              background={"#A40123"}
              onClick={callbacks.onGetFilteringMasters}
            >ПОИСК
            </Button>
          </section>
          <section className="masters-page__masters">
            <h2 className="masters-page__masters-h2">Секция мастеров</h2>
            <ul className="masters-page__list">
              {select.masters?.map((el) => {

                return <li className="masters-page__wrapp-master-card wrapp-master-card" data-master-id={el.id} data-salon-id={el.shops[0].id} key={el.id}>
                  <MasterCard
                    name={el.profile.user.name}
                    surname={el.profile.user.surname}
                    specialization={el.profession}
                    description={el.description}
                    salon={el.shops[0].name}
                    rating={el.reviews_scores_count}
                    pathImg={el.img_file.path}
                    textBtn={'Записаться'}
                    colorTextBtnRecord={'#F5BFAB'}
                    colorBkgBtnRecord={'#A40123'}
                    linkTo={'/master'}
                  />
                </li>
              })}
            </ul>

          </section>
          <div className="masters-page__wrapp-pagination">
            <Pagination
              length={select.pagination != null ? select.pagination?.pages_total : 10}
              onClick={callbacks.onGetMastersOnActivePage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MastersPage);