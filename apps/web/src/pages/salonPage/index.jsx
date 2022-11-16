import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changingLabelInHeaderAction(false));
    dispatch(changeHeaderBackgroundAction('#F5BFAB'));
    dispatch(changeNavigationColorAction('#410935'));
  }, []);

  const renders = {
    yandexMap: <YandexMap center={[53.21624037527426, 50.13260255066459]}
      zoom={12} items={[[53.21624037527426, 50.13260255066459],]} />
  }

  return (
    <div className="salon-page">
      <div className="container">
        <div className="salon-page__flex">
          <div className="salon-page__wrapp-salon-card">
            <SalonCard
              colorTitle={'#F5BFAB'}
              bkgInfo={'#410935'}
              salonTitle={'Салон-красоты «Версаль»'}
              address={'Москва, ул. Костина, 6/1, 3 этаж (м. Красносельская)'}
              workinghours={'Время работы: с 10:00 до 20:00 без выходных'}
              telephone={'Телефон: (495) 123-45-67'}
              parking={'Бесплатная гостевая парковка'}
              bckCallBtn={'#F5BFAB'}
              colorTextCallBtn={'#410935'}
              map={renders.yandexMap}
              bkgRecordBtn={'#A40123'}
              colorTextRecordBtn={'#F5BFAB'}
            />
          </div>
          <div className="salon-page__wrapp-carousel">
            <Carousel
              images={[img1, img2, img3, img3, img2, img1]}
            />
          </div>
          <div className="salon-page__wrapp-master-card">
            <MasterCard
              pathImg={master1}
              name={'Светлана Иванова '}
              specialization={'мастер парикмахер'}
              salon={'Салон красоты «Версаль»'}
              colorTextBtn={'#F5BFAB'}
            />
          </div>
          <div className="salon-page__wrapp-master-card">
            <MasterCard
              pathImg={master2}
              name={'Светлана Иванова '}
              specialization={'мастер парикмахер'}
              salon={'Салон красоты «Версаль»'}
              colorTextBtn={'#F5BFAB'}
            />
          </div>
          <div className="salon-page__wrapp-pagination">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SalonPage);