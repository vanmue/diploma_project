import React, { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SalonCard from '../../Components/SalonCard';
import YandexMap from '../../Components/YandexMap';
import Carousel from '../../Components/Carousel';
import MasterCard from '../../Components/MasterCard';
import Pagination from '../../Components/Pagination';
import { getAciveSalonByIdThunk } from '../../actions/salonsAction';
import { getAllMasterForActiveSalonThunk } from '../../actions/mastersActions';
import './salon-page.scss';

function SalonPage() {
  const select = useSelector(store => ({
    activeSalonId: store.salonsReducer.activeSalonId,             // id салона
    activeSalon: store.salonsReducer.activeSalon,                 // info активного салона
    mastersActiveSalon: store.mastersReducer.mastersActiveSalon,  // masters активного салона
    pagination: store.mastersReducer.pagination,                  // info pagination
  }));
  const location = useLocation();
  const dispatch = useDispatch();
  console.log("location", location)


  useEffect(() => {
    dispatch(getAciveSalonByIdThunk(+location.state.activeSalonId));
    dispatch(getAllMasterForActiveSalonThunk(+location.state.activeSalonId));
  }, []);

  const callbacks = {
    // GET all masters активного салона
    onGetAllMastersForAciveSalon: useCallback((page) => {
      dispatch(getAllMasterForActiveSalonThunk(select.activeSalonId, page));
    })
  }

  const renders = {
    yandexMap: <YandexMap center={[select.activeSalon?.center_latitude, select.activeSalon?.center_longtitude]}
      zoom={select.activeSalon?.zoom} items={[[select.activeSalon?.label_latitude, select.activeSalon?.label_longtitude]]} />
  }

  return (
    <div className="salon-page">
      <div className="container">
        <div className="salon-page__flex">
          <div className="salon-page__wrapp-salon-card">
            <SalonCard
              colorTitle={'#F5BFAB'}
              bkgInfo={'#410935'}

              salonTitle={select.activeSalon?.name}
              address={select.activeSalon?.address}
              city={select.activeSalon?.city}
              workinghours={select.activeSalon?.working_time}
              telephone={select.activeSalon?.phone}
              parking={select.activeSalon?.advantages[0]?.name}
              deliverableGgroups={select.activeSalon?.deliverable_groups}
              bckCallBtn={'#F5BFAB'}
              colorTextCallBtn={'#410935'}
              bkgRecordBtn={'#A40123'}
              colorTextRecordBtn={'#F5BFAB'}
              map={renders.yandexMap}
            />
          </div>
          <div className="salon-page__wrapp-carousel">
            <Carousel
              images={select.activeSalon?.images}
            />
          </div>
          {select.mastersActiveSalon?.map((el) => (
            <div className="salon-page__wrapp-master-card wrapp-master-card" data-master-id={el.id} data-salon-id={el.shops[0].name} key={el.id}>
              <MasterCard
                name={el.profile.user.name}
                surname={el.profile.user.surname}
                pathImg={el.img_file.path}
                rating={el.reviews_scores_count}
                specialization={el.profession}
                salon={el.shops[0].name}
                description={el.description}
                textBtn={'Записаться'}
                colorTextBtnRecord={'#F5BFAB'}
                colorBkgBtnRecord={'#A40123'}
                linkTo={'/master'}
              />
            </div>
          ))}
          <div className="salon-page__wrapp-pagination">
            <Pagination
              length={select.pagination != null ? select.pagination?.pages_total : 10}
              onClick={callbacks.onGetAllMastersForAciveSalon}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SalonPage);