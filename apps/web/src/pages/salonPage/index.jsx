import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SalonCard from '../../Components/SalonCard';
import YandexMap from '../../Components/YandexMap';
import Carousel from '../../Components/Carousel';
import MasterCard from '../../Components/MasterCard';
import Pagination from '../../Components/Pagination';
import { getAciveSalonByIdThunk } from '../../actions/salonsAction';
import { getAllMasterForActiveSalonThunk } from '../../actions/mastersActions';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction
} from '../../actions/stylesActions';
import './salon-page.scss';

function SalonPage() {
  const activeSalonId = useSelector(store => store.salonsReducer.activeSalonId);
  const activeSalon = useSelector(store => store.salonsReducer.activeSalon);
  const mastersActiveSalon = useSelector(store => store.mastersReducer.mastersActiveSalon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changingLabelInHeaderAction(false));
    dispatch(changeHeaderBackgroundAction('#F5BFAB'));
    dispatch(changeNavigationColorAction('#410935'));

    dispatch(getAciveSalonByIdThunk(activeSalonId));
    dispatch(getAllMasterForActiveSalonThunk(activeSalonId));
  }, []);

  const callbacks = {
    onGetAllMastersForAciveSalon: useCallback((page) => {
      dispatch(getAllMasterForActiveSalonThunk(activeSalonId, page));
    })
  }

  const renders = {
    yandexMap: <YandexMap center={[53.21624037527426, 50.13260255066459]}
      zoom={12} items={[[53.21624037527426, 50.13260255066459]]} />
  }

  return (
    <div className="salon-page">
      <div className="container">
        <div className="salon-page__flex">
          <div className="salon-page__wrapp-salon-card">
            <SalonCard
              colorTitle={'#F5BFAB'}
              bkgInfo={'#410935'}
              salonTitle={activeSalon?.name}
              address={activeSalon?.address}
              city={activeSalon?.city}
              workinghours={activeSalon?.working_time}
              telephone={activeSalon?.phone}
              parking={activeSalon?.advantages[0]?.name}
              deliverableGgroups={activeSalon?.deliverable_groups}

              bckCallBtn={'#F5BFAB'}
              colorTextCallBtn={'#410935'}
              bkgRecordBtn={'#A40123'}
              colorTextRecordBtn={'#F5BFAB'}

              map={renders.yandexMap}
            />
          </div>
          <div className="salon-page__wrapp-carousel">
            <Carousel
              images={[
                {
                  "id": 5,
                  "is_preview": true,
                  "file": {
                    "id": 4,
                    "originalname": "shop_image_1.png",
                    "path": "/uploads/shops/7a405c54-64c1-4525-a2bf-31a82442e167.png"
                  }
                },
                {
                  "id": 6,
                  "is_preview": false,
                  "file": {
                    "id": 5,
                    "originalname": "shop_image_2.png",
                    "path": "/uploads/shops/913631b9-d181-4ff7-ae57-4d33694f422d.png"
                  }
                },
                {
                  "id": 7,
                  "is_preview": false,
                  "file": {
                    "id": 6,
                    "originalname": "shop_image_3.png",
                    "path": "/uploads/shops/bd02f81a-6a98-415f-bf75-fc98b0ebcbad.png"
                  }
                },
                {
                  "id": 8,
                  "is_preview": false,
                  "file": {
                    "id": 5,
                    "originalname": "shop_image_2.png",
                    "path": "/uploads/shops/913631b9-d181-4ff7-ae57-4d33694f422d.png"
                  }
                },
                {
                  "id": 9,
                  "is_preview": false,
                  "file": {
                    "id": 5,
                    "originalname": "shop_image_2.png",
                    "path": "/uploads/shops/913631b9-d181-4ff7-ae57-4d33694f422d.png"
                  }
                },
                {
                  "id": 10,
                  "is_preview": false,
                  "file": {
                    "id": 5,
                    "originalname": "shop_image_2.png",
                    "path": "/uploads/shops/913631b9-d181-4ff7-ae57-4d33694f422d.png"
                  }
                },
              ]}
            />
            {/* <Carousel
              images={activeSalon?.images}
            /> */}
          </div>
          {mastersActiveSalon?.map((el) => (
            <div className="salon-page__wrapp-master-card" data-master-id={el.id} data-salon-id={el.shops[0].name} key={el.id}>
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
              />
            </div>
          ))}
          <div className="salon-page__wrapp-pagination">
            <Pagination
              onClick={callbacks.onGetAllMastersForAciveSalon}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SalonPage);