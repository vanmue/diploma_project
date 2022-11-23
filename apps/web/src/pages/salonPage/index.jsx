import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SalonCard from '../../Components/SalonCard';
import YandexMap from '../../Components/YandexMap';
import Carousel from '../../Components/Carousel';
import MasterCard from '../../Components/MasterCard';
import Pagination from '../../Components/Pagination';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction
} from '../../actions/stylesActions';
import img1 from '../../Components/Carousel/img/carusel-img-1.jpg';
import img2 from '../../Components/Carousel/img/carusel-img-2.jpg';
import img3 from '../../Components/Carousel/img/carusel-img-3.jpg';
import master1 from '../masters/img/master-1.jpg';
import master2 from '../masters/img/master-2.jpg';
import './salon-page.scss';

function SalonPage() {
  const activeSalonId = useSelector(store => store.salonsReducer.activeSalonId);
  const activeSalon = useSelector(store => store.salonsReducer.salons.find((el) => el.id == activeSalonId));
  const dispatch = useDispatch();

  console.log('SalonPage activeSalonId: ', activeSalonId);
  console.log('SalonPage activeSalon: ', activeSalon);

  useEffect(() => {
    dispatch(changingLabelInHeaderAction(false));
    dispatch(changeHeaderBackgroundAction('#F5BFAB'));
    dispatch(changeNavigationColorAction('#410935'));
  }, []);

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
              images={activeSalon.images}
            />
            {/* <Carousel
              images={[img1, img1, img1, img2, img2, img2, img3, img3, img3]}
            /> */}
          </div>
          {activeSalon.masters.map((el) => (
            <div className="salon-page__wrapp-master-card" key={el.id}>
              <MasterCard
                pathImg={el.img}
                name={'Светлана Иванова '}
                specialization={el.profession}
                salon={activeSalon.name}
                description={el.description}
                colorTextBtn={'#F5BFAB'}
              />
            </div>
          ))}
          {/* <div className="salon-page__wrapp-master-card">
            <MasterCard
              pathImg={master1}
              name={'Светлана Иванова '}
              specialization={'мастер парикмахер'}
              salon={'Салон красоты «Версаль»'}
              colorTextBtn={'#F5BFAB'}
            />
          </div> */}
          {/* <div className="salon-page__wrapp-master-card">
            <MasterCard
              pathImg={master2}
              name={'Светлана Иванова '}
              specialization={'мастер парикмахер'}
              salon={'Салон красоты «Версаль»'}
              colorTextBtn={'#F5BFAB'}
            />
          </div> */}
          <div className="salon-page__wrapp-pagination">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SalonPage);