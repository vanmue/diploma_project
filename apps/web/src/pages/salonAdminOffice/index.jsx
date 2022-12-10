import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesThunk } from '../../actions/citiesActions';
import { getAllAdvantagesThunk } from '../../actions/advantagesActions';
import { getAllMasterForActiveSalonThunk } from '../../actions/mastersActions';
import {
  postNewSalonThunk,
  postImageForSalonThunk,
  getAciveSalonByIdThunk,
  uploadImageForSalonThunk
} from '../../actions/salonsAction';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction,
} from '../../actions/stylesActions';
import FormForSalon from '../../Components/FormForSalon';
import SalonCard from '../../Components/SalonCard';
import YandexMap from '../../Components/YandexMap';
import Button from '../../Components/Button';
import Carousel from '../../Components/Carousel';
import MasterAddCard from '../../Components/masterAddCard';
import Pagination from '../../Components/Pagination';
import DrpdnForAddSalons from '../../Components/DrpdnForAddSalons';
import MasterCard from '../../Components/MasterCard';
import img1 from '../../Components/Carousel/img/carusel-img-1.jpg';
import img2 from '../../Components/Carousel/img/carusel-img-2.jpg';
import './salon-admin-office.scss';

function SalonAdminOffice() {

  const select = useSelector(store => ({
    cities: store.citiesReducer.cities,
    advantages: store.advantagesReducer.advantages,
    activeSalonId: store.salonsReducer.activeSalonId,
    activeSalon: store.salonsReducer.activeSalon,
    imgForCarouselId: store.salonsReducer.imgForCarouselId,
    mastersActiveSalon: store.mastersReducer.mastersActiveSalon,
    activePageMastersActiveSalon: store.mastersReducer.activePageMastersActiveSalon,
    pagination: store.mastersReducer.pagination,
  }))

  const [isActiveFormForSalon, setIsActiveFormForSalon] = useState(false);
  const [imageForSalon, setImageForSalon] = useState({
    shopId: 3,                // {number} - id салона
    fileId: null,             // {number} - id изображения 42
    is_preview: "false",      // {string} - флаг картинки
  });
  const [formNewSalon, setFormNewSalon] = useState({
    name: null,
    cityId: 0,
    address: null,
    working_time: null,
    working_start: 0,
    working_end: 0,
    advantages: [],
    phone: null,
    center_latitude: 0,
    center_longtitude: 0,
    label_latitude: 0,
    label_longtitude: 0,
    zoom: 0,
  });
  const formNewSalonTest = {
    name: "NewSalon-r",
    address: "Семфтропольская улица",
    working_time: "начало в 10 до 20",
    working_start: "10:00",
    working_end: "20:00",
    phone: "1234567890",
    center_longtitude: 59.91796593897841,
    center_latitude: 30.304908500000003,
    label_longtitude: 59.93069550217494,
    label_latitude: 30.295617482627414,
    zoom: 10,
    cityId: 3,
    advantages: [1]
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changingLabelInHeaderAction(false));
    dispatch(changeHeaderBackgroundAction('#F5BFAB'));
    dispatch(changeNavigationColorAction('#410935'));

    dispatch(getCitiesThunk());
    dispatch(getAllAdvantagesThunk());
    dispatch(getAciveSalonByIdThunk(select.activeSalonId));
    dispatch(getAllMasterForActiveSalonThunk(select.activeSalonId, 1));
  }, []);
  useEffect(() => {
    setImageForSalon({ ...imageForSalon, fileId: select.imgForCarouselId });
  }, [select.imgForCarouselId]);

  // useEffect(() => {
  //   dispatch(getAllMasterForActiveSalonThunk());
  // }, [select.activePageMastersActiveSalon]);

  const callbacks = {
    onSetIsActiveFormForSalon: useCallback(() => {
      setIsActiveFormForSalon(prevIsActive => !prevIsActive);
    }),
    // onPostNewSalon: useCallback((id) => {
    //   console.log('handleClickBtnPostNewSalon');
    //   // dispatch(postNewSalonThunk(formNewSalonTest));
    //   dispatch(postNewSalonThunk(formNewSalon));
    // }),
    onPostImageForSalon: useCallback(() => {
      console.log('onPostImageForSalon imageForSalon:', imageForSalon);
      dispatch(postImageForSalonThunk(imageForSalon));
    }),
    onChangeUploadImageForSalon: useCallback(() => {
      let inputFile = document.querySelector('.carousel__add-img-input').files[0]
      dispatch(uploadImageForSalonThunk({ file: inputFile }));
    }),
    onGetActivePagePagination: useCallback((page) => {
      dispatch(getAllMasterForActiveSalonThunk(select.activeSalonId, +page));
    }),
  }

  const renders = {
    yandexMap: <YandexMap center={[53.21624037527426, 50.13260255066459]}
      zoom={12} items={[[53.21624037527426, 50.13260255066459]]} />
  }

  return (
    <div className='salon-admine-office'>
      <div className="container">
        <div className="salon-admine-office__flex">
          <div className="salon-admine-office__wrapp-salon-card">
            {select.activeSalon ? <SalonCard
              salonTitle={select.activeSalon.name}
              city={select.activeSalon.city}
              address={select.activeSalon.address}
              colorTitle={"#F5BFAB"}
              bkgInfo={"#410935"}
              workinghours={select.activeSalon.working_time}
              parking={select.activeSalon?.advantages[0]?.name}
              telephone={select.activeSalon.phone}
              deliverableGgroups={select.activeSalon.deliverable_groups}
              isEdited={true}
              img={select.activeSalon?.images?.length > 0 ? select.activeSalon.images.find(el => el.is_preview == true)?.file.path : ''}
              // map={renders.yandexMap}
              onClickEditing={callbacks.onSetIsActiveFormForSalon}
            /> : ''}
          </div>
          <div className="salon-admine-office__wrapp-carousel">
            <Carousel
              images={select.activeSalon?.images}
              isEdited={true}
              onChange={callbacks.onChangeUploadImageForSalon}
              onClick={callbacks.onPostImageForSalon}
            />
          </div>
          <div className="salon-admine-office__wrapp-master-add-card">
            <MasterAddCard
            />
          </div>

          <div className="salon-admine-office__masters">
            <p className="salon-admine-office__masters-title">Мастера салона:</p>
            {select.mastersActiveSalon?.map((el, index) => {
              return <div className="salon-admine-office__wrapp-master-card" key={el.id}>
                <MasterCard
                  name={el.profile.user.name}
                  surname={el.profile.user.surname}
                  // rating={3.5}
                  rating={el.reviews_scores_count}
                  salon={el.shops[0].name}
                  pathImg={el.img_file.path}
                  specialization={el.profession}
                  description={el.description}
                  textBtn={'Удалить мастера'}
                  colorTextBtnRecord={'#FFFFFF'}
                  colorBkgBtnRecord={'#410935'}
                //  linkTo
                />
              </div>
            })}
            <div className="salon-admine-office__wrapp-pagination">
              <Pagination
                length={select.pagination ? select.pagination.pages_total : 1}
                onClick={callbacks.onGetActivePagePagination}
              />
            </div>
          </div>
          {isActiveFormForSalon &&
            <div className="salon-admine-office__wrapp-form-for-salon">
              <FormForSalon
                req="PATCH"
                onClickClose={callbacks.onSetIsActiveFormForSalon}
              />
            </div>
          }


        </div>
      </div>
    </div>
  )
}

export default React.memo(SalonAdminOffice);