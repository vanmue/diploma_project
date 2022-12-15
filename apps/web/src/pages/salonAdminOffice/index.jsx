import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesThunk } from '../../actions/citiesActions';
import { getAllAdvantagesThunk } from '../../actions/advantagesActions';
import { getAllMasterForActiveSalonThunk } from '../../actions/mastersActions';
import {
  postImageForSalonThunk,
  getAciveSalonByIdThunk,
  uploadImageForSalonThunk,
} from '../../actions/salonsAction';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction,
} from '../../actions/stylesActions';
import { deleteMasterThunk } from '../../actions/mastersActions';
import FormForSalon from '../../Components/FormForSalon';
import SalonCard from '../../Components/SalonCard';
import YandexMap from '../../Components/YandexMap';
import Carousel from '../../Components/Carousel';
import MasterAddCard from '../../Components/masterAddCard';
import Pagination from '../../Components/Pagination';
import MasterCard from '../../Components/MasterCard';
import './salon-admin-office.scss';

function SalonAdminOffice() {

  const select = useSelector(store => ({
    cities: store.citiesReducer.cities,                                    // [{}] - города
    advantages: store.advantagesReducer.advantages,                        // [{}] - услуги
    activeSalonId: store.salonsReducer.activeSalonId,                      // id активного салона
    activeSalon: store.salonsReducer.activeSalon,                          // {} - info активного салона
    imgForCarouselId: store.salonsReducer.imgForCarouselId,                // id img для POST 
    mastersActiveSalon: store.mastersReducer.mastersActiveSalon,           // [{}] - мастера активного салона 
    activePageMastersActiveSalon: store.mastersReducer.activePageMastersActiveSalon, // page пагинации
    pagination: store.mastersReducer.pagination,                           // all info пагинации
  }))

  const [activeSalonId, setActiveSalonId] = useState(JSON.parse(localStorage.getItem("activeSalonId")) ? +JSON.parse(localStorage.getItem("activeSalonId")) :
    JSON.parse(localStorage.getItem("profilId")).salonId);                 // id активного салона
  const [isActiveFormForSalon, setIsActiveFormForSalon] = useState(false); // флаг формы салона
  const [imageForSalon, setImageForSalon] = useState({                     // form POST img for salon
    shopId: activeSalonId,             // {number} - id салона
    fileId: null,                      // {number} - id изображения
    is_preview: "false",               // {string} - флаг картинки
  });
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(changingLabelInHeaderAction(false));
    dispatch(changeHeaderBackgroundAction('#F5BFAB'));
    dispatch(changeNavigationColorAction('#410935'));

    dispatch(getCitiesThunk());
    dispatch(getAllAdvantagesThunk());
    dispatch(getAciveSalonByIdThunk(activeSalonId));
    dispatch(getAllMasterForActiveSalonThunk(activeSalonId, 1));
  }, []);

  useEffect(() => {
    setImageForSalon({ ...imageForSalon, fileId: select.imgForCarouselId });
  }, [select.imgForCarouselId]);

  const callbacks = {
    onSetIsActiveFormForSalon: useCallback(() => {                    // Показать/скрыть form salon
      setIsActiveFormForSalon(prevIsActive => !prevIsActive);
    }),
    onPostImageForSalon: useCallback(() => {                          // POST img for salon
      dispatch(postImageForSalonThunk(imageForSalon));
    }),
    onChangeUploadImageForSalon: useCallback((e) => {                 // Upliad img form salon
      let inputFile = e.currentTarget.files[0];
      dispatch(uploadImageForSalonThunk({ file: inputFile }));
    }),
    onGetActivePagePagination: useCallback((page) => {                // Active page pagination
      dispatch(getAllMasterForActiveSalonThunk(activeSalonId, +page));
    }),
    onDeleteMaster: useCallback((id) => {                             // Delete master
      dispatch(deleteMasterThunk(id));
    }),
  }

  // Компонент YandexMap
  const renders = {
    yandexMap: <YandexMap center={[select.activeSalon?.center_latitude, select.activeSalon?.center_longtitude]}
      zoom={select.activeSalon?.zoom} items={[[select.activeSalon?.label_latitude, select.activeSalon?.label_longtitude]]} />
  }

  return (
    <div className='salon-admine-office'>
      <div className="container">
        <div className="salon-admine-office__flex">
          <div className="salon-admine-office__flex-salon-id">id Салона: {select.activeSalon?.id}</div>
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
              map={renders.yandexMap}
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
              return <div className="salon-admine-office__wrapp-master-card wrapp-master-card" data-master-id={el.id} key={el.id}>
                <MasterCard
                  name={el.profile.user.name}
                  surname={el.profile.user.surname}
                  rating={el.reviews_scores_count}
                  salon={el.shops[0].name}
                  pathImg={el.img_file.path}
                  specialization={el.profession}
                  description={el.description}
                  textBtn={'Удалить мастера'}
                  colorTextBtnRecord={'#FFFFFF'}
                  colorBkgBtnRecord={'#410935'}
                  onClick={callbacks.onDeleteMaster}
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
                salonId={activeSalonId}
                salon={select.activeSalon}
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