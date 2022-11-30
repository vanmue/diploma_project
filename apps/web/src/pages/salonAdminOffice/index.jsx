import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SalonCard from '../../Components/SalonCard';
import YandexMap from '../../Components/YandexMap';
import Button from '../../Components/Button';
import Carousel from '../../Components/Carousel';
import MasterAddCard from '../../Components/masterAddCard';
import Pagination from '../../Components/Pagination';
import DrpdnForAddSalons from '../../Components/DrpdnForAddSalons';
import MasterCard from '../../Components/MasterCard';
import { getCitiesThunk } from '../../actions/citiesActions';
import { getAllAdvantagesThunk } from '../../actions/advantagesActions';
import { getAllMasterForActiveSalonThunk } from '../../actions/mastersActions';
import {
  postNewSalonThunk,
  postImageForSalonThunk,
  getAciveSalonByIdThunk
} from '../../actions/salonsAction';
import {
  changeNavigationColorAction,
  changingLabelInHeaderAction,
  changeHeaderBackgroundAction,
} from '../../actions/stylesActions';
import img1 from '../../Components/Carousel/img/carusel-img-1.jpg';
import img2 from '../../Components/Carousel/img/carusel-img-2.jpg';
import './salon-admin-office.scss';

function SalonAdminOffice() {

  const select = useSelector(store => ({
    cities: store.citiesReducer.cities,
    advantages: store.advantagesReducer.advantages,
    activeSalonId: store.salonsReducer.activeSalonId,
    activeSalon: store.salonsReducer.activeSalon,
    mastersActiveSalon: store.mastersReducer.mastersActiveSalon,
  }))

  const [isActiveModal, setIsActiveModal] = useState(false);
  const [imageForSalon, setImageForSalon] = useState({
    img: "",
    is_preview: "true",
    shopId: 4
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
    name: "NewSalon-2",
    address: "Семфтропольская улица",
    working_time: "начало в 10 до 20",
    working_start: 10,
    working_end: 20,
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
    dispatch(getAllMasterForActiveSalonThunk(select.activeSalonId));
  }, []);
  // useEffect(() => {
  //   console.log('SalonAdminOffice useEffect select.activeSalon: ', select.activeSalon)
  //   // console.log('SalonAdminOffice useEffect select.advantages: ', select.advantages)
  //   // console.log('SalonAdminOffice useEffect formNewSalon: ', formNewSalon)
  // }, [select.activeSalon]);

  const handleChangeTextareaModalNewSalon = (e) => {
    console.log('handleChangeTextareaModalNewSalon e: ', e.currentTarget.getAttribute("id"))
    switch (e.currentTarget.getAttribute("id")) {
      case 'salon-name':
        setFormNewSalon({ ...formNewSalon, name: e.currentTarget.value });
        break;
      case 'salon-address':
        setFormNewSalon({ ...formNewSalon, address: e.currentTarget.value });
        break;
      case 'salon-working-hours':
        setFormNewSalon({ ...formNewSalon, working_time: e.currentTarget.value });
        break;
      case 'salon-working-start':
        setFormNewSalon({ ...formNewSalon, working_start: e.currentTarget.value });
        break;
      case 'salon-working-end':
        setFormNewSalon({ ...formNewSalon, working_end: e.currentTarget.value });
        break;
      case 'salon-telephone':
        setFormNewSalon({ ...formNewSalon, phone: e.currentTarget.value });
        break;
      case 'salon-latitude-center':
        setFormNewSalon({ ...formNewSalon, center_latitude: e.currentTarget.value });
        break;
      case 'salon-longtitude-center':
        setFormNewSalon({ ...formNewSalon, center_longtitude: e.currentTarget.value });
        break;
      case 'salon-latitude-placemark':
        setFormNewSalon({ ...formNewSalon, label_latitude: e.currentTarget.value });
        break;
      case 'salon-longitude-placemark':
        setFormNewSalon({ ...formNewSalon, label_longtitude: e.currentTarget.value });
        break;
      case 'salon-zoom':
        setFormNewSalon({ ...formNewSalon, zoom: e.currentTarget.value });
        break;
      default:

    }
  }

  const handleClickBtnCloseModal = () => {
    setIsActiveModal(prevIsActiveModal => !prevIsActiveModal);
  }

  const callbacks = {
    onSetIsActiveEditingSalonModal: useCallback(() => {
      setIsActiveModal(prevIsActiveModal => !prevIsActiveModal);
    }),
    onSetCitiesId: useCallback((id) => {
      setFormNewSalon({ ...formNewSalon, cityId: Number(id) })
    }),
    onSetАdvantagesId: useCallback((id) => {
      let arrAdv = formNewSalon.advantages;
      arrAdv.push(id);
      setFormNewSalon({ ...formNewSalon, advantages: arrAdv })
    }),
    onPostNewSalon: useCallback((id) => {
      console.log('handleClickBtnPostNewSalon');
      // dispatch(postNewSalonThunk(formNewSalonTest));
      dispatch(postNewSalonThunk(formNewSalon));
    }),
    onPostImageForSalon: useCallback(() => {
      // console.log('onPostImageForSalon imageForSalon:', imageForSalon);
      dispatch(postImageForSalonThunk(imageForSalon));
    }),
    onChangeUploadImageForSalon: useCallback(() => {
      let inputFile = document.querySelector('.carousel__add-img-input').files[0]

      console.log('onChangeUploadImageForSalon .files[0]', inputFile);
      // console.log('document.querySelector inputFile :', inputFile);
      setImageForSalon({ ...imageForSalon, img: inputFile });
    }),
    onGetActivePagePagination: useCallback((page) => {
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
              parking={select.activeSalon.advantages[0].name}
              telephone={select.activeSalon.phone}
              deliverableGgroups={select.activeSalon.deliverable_groups}
              isEdited={true}
              // textLink,
              // bckCallBtn,
              // colorTextCallBtn,
              // bkgRecordBtn,
              // colorTextRecordBtn,
              // img,
              // map={renders.yandexMap}
              onClickEditing={callbacks.onSetIsActiveEditingSalonModal}
            /> : ''}
          </div>
          <div className="salon-admine-office__wrapp-carousel">
            <Carousel
              images={[{ img: img1 }, { img: img2 },]}
              isEdited
              onClick={callbacks.onPostImageForSalon}
              onChange={callbacks.onChangeUploadImageForSalon}
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
                  name={el.user.name}
                  surname={el.user.surname}
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
                onClick={callbacks.onGetActivePagePagination}
              />
            </div>
          </div>

          {isActiveModal ? <div className="salon-admine-office__editing-salon">
            <div
              className="salon-admine-office__editing-salon-close"
              onClick={handleClickBtnCloseModal}
            ></div>
            <div className="salon-admine-office__editing-salon-name salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-name-label"
                htmlFor="salon-name">
                Название салона:
              </label>
              <input
                id="salon-name"
                className="salon-admine-office__editing-salon-name-input"
                name="name"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>

            <div className="salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-city-label">
                Город:
              </label>
              <div className="salon-admine-office__wrapp-drpdn-add-salon">
                <DrpdnForAddSalons
                  items={select.cities}
                  onChange={callbacks.onSetCitiesId}
                />
              </div>
            </div>

            <div className="salon-admine-office__editing-salon-address salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-address-label"
                htmlFor="salon-address">
                Адрес:
              </label>
              <input
                id="salon-address"
                className="salon-admine-office__editing-salon-address-input"
                name="address"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>
            <div className="salon-admine-office__editing-salon-working-hours salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-working-hours-label"
                htmlFor="salon-working-hours">
                Время работы:
              </label>
              <input
                id="salon-working-hours"
                className="salon-admine-office__editing-salon-working-hours-input"
                name="working-hours"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>
            <div className="salon-admine-office__editing-salon-working-start salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-working-start-label"
                htmlFor="salon-working-start">
                Начало работы:
              </label>
              <input
                id="salon-working-start"
                className="salon-admine-office__editing-salon-working-start-input"
                name="working-start"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>
            <div className="salon-admine-office__editing-salon-working-end salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-working-end-label"
                htmlFor="salon-working-end">
                Конец работы:
              </label>
              <input
                id="salon-working-end"
                className="salon-admine-office__editing-salon-working-end-input"
                name="working-end"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>

            <div className="salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-advantages-label">
                Преимущества:
              </label>
              <div className="salon-admine-office__wrapp-drpdn-add-salon">
                <DrpdnForAddSalons
                  items={select.advantages}
                  onChange={callbacks.onSetАdvantagesId}
                />
              </div>
            </div>
            {/* <div className="salon-admine-office__editing-salon-advantages salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-advantages-label"
                htmlFor="salon-advantages">
                Преимущества:
              </label>
              <input
                id="salon-advantages"
                className="salon-admine-office__editing-salon-advantages-input"
                name="advantages"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div> */}


            <div className="salon-admine-office__editing-salon-telephone salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-telephone-label"
                htmlFor="salon-telephone">
                Телефон:
              </label>
              <input
                id="salon-telephone"
                className="salon-admine-office__editing-salon-telephone-input"
                name="telephone"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>
            <div className="salon-admine-office__editing-salon-latitude-center salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-latitude-center-label"
                htmlFor="salon-latitude-center">
                Геог-кая широта центра карты:
              </label>
              <input
                id="salon-latitude-center"
                className="salon-admine-office__editing-salon-latitude-center-input"
                name="latitude-center"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>
            <div className="salon-admine-office__editing-salon-longtitude-center salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-longtitude-center-label"
                htmlFor="salon-longtitude-center">
                Геог-кая долгота центра карты:
              </label>
              <input
                id="salon-longtitude-center"
                className="salon-admine-office__editing-salon-longtitude-center-input"
                name="longtitude-center"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>
            <div className="salon-admine-office__editing-salon-latitude-placemark salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-latitude-placemark-label"
                htmlFor="salon-latitude-placemark">
                Геог-кая широта метки:
              </label>
              <input
                id="salon-latitude-placemark"
                className="salon-admine-office__editing-salon-latitude-placemark-input"
                name="latitude-placemark"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>
            <div className="salon-admine-office__editing-salon-longitude-placemark salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-longitude-placemark-label"
                htmlFor="salon-longitude-placemark">
                Геог-кая долгота метки:
              </label>
              <input
                id="salon-longitude-placemark"
                className="salon-admine-office__editing-salon-longitude-placemark-input"
                name="longitude-placemark"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>
            <div className="salon-admine-office__editing-salon-zoom salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-zoom-label"
                htmlFor="salon-zoom">
                Масштаб:
              </label>
              <input
                id="salon-zoom"
                className="salon-admine-office__editing-salon-zoom-input"
                name="zoom"
                type="text"
                onChange={handleChangeTextareaModalNewSalon}
              />
            </div>
            <div className="salon-admine-office__editing-salon-wrapp-button">
              <Button
                background={"#410935"}
                colorText={"#FFFFFF"}
                onClick={callbacks.onPostNewSalon}
              >Сохранить</Button>
            </div>
          </div> : ""}
        </div>
      </div>
    </div>
  )
}

export default React.memo(SalonAdminOffice);