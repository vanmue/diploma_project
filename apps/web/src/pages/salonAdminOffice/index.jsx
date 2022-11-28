import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNavigationColorAction, changingLabelInHeaderAction, changeHeaderBackgroundAction } from '../../actions/stylesActions';
import SalonCard from '../../Components/SalonCard';
import YandexMap from '../../Components/YandexMap';
import Button from '../../Components/Button';
import Carousel from '../../Components/Carousel';
import MasterAddCard from '../../Components/masterAddCard';
import Pagination from '../../Components/Pagination';
import DrpdnForAddSalons from '../../Components/DrpdnForAddSalons';
import { getCitiesThunk } from '../../actions/citiesActions';
import { getAllAdvantagesThunk } from '../../actions/advantagesActions';
import { postNewSalonThunk } from '../../actions/salonsAction';
import { postImageForSalonThunk } from '../../actions/salonsAction';
import img1 from '../../Components/Carousel/img/carusel-img-1.jpg';
import img2 from '../../Components/Carousel/img/carusel-img-2.jpg';
import img3 from '../../Components/Carousel/img/carusel-img-3.jpg';
import './salon-admin-office.scss';

function SalonAdminOffice() {
  const dispatch = useDispatch();
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [imageForSalon, setImageForSalon] = useState({
    img: "",
    is_preview: "true",
    shopId: 4
  });
  const [formNewSalon, setFormNewSalon] = useState({
    name: null,
    address: null,
    working_time: null,
    working_start: 0,
    working_end: 0,
    phone: null,
    images: [
      null
    ],
    center_longtitude: 0,
    center_latitude: 0,
    label_longtitude: 0,
    label_latitude: 0,
    zoom: 0,
    cityId: 0,
    advantages: [

    ]
  });
  const formNewSalonTest = {
    name: "NewSalon-1",
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
    cityId: 1,
    advantages: [
      1
    ]
  }


  const select = {
    cities: useSelector((store => store.citiesReducer.cities)),
    advantages: useSelector((store => store.advantagesReducer.advantages)),
  }

  useEffect(() => {
    dispatch(changingLabelInHeaderAction(false));
    dispatch(changeHeaderBackgroundAction('#F5BFAB'));
    dispatch(changeNavigationColorAction('#410935'));

    dispatch(getCitiesThunk());
    dispatch(getAllAdvantagesThunk());
  }, []);
  useEffect(() => {
    console.log('SalonAdminOffice useEffect formNewSalon: ', formNewSalon)
    // console.log('SalonAdminOffice useEffect select.advantages: ', select.advantages)
  }, [formNewSalon, select.advantages]);

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

  // const handleClickBtnPostNewSalon = () => {
  //   console.log('handleClickBtnPostNewSalon')
  // }

  const callbacks = {
    onSetIsActiveEditingSalonModal: useCallback(() => {
      setIsActiveModal(prevIsActiveModal => !prevIsActiveModal);
    }),
    onSetCitiesId: useCallback((id) => {
      setFormNewSalon({ ...formNewSalon, cityId: Number(id) })
      // console.log('SalonAdminOffice id: ', id)
    }),
    onSetАdvantagesId: useCallback((id) => {
      let arrAdv = formNewSalon.advantages;
      arrAdv.push(id);
      setFormNewSalon({ ...formNewSalon, advantages: arrAdv })
      // console.log('SalonAdminOffice id: ', id)
    }),
    onPostNewSalon: useCallback((id) => {
      console.log('handleClickBtnPostNewSalon');
      dispatch(postNewSalonThunk(formNewSalon));
    }),
    onPostImageForSalon: useCallback(() => {
      dispatch(postImageForSalonThunk(imageForSalon));
      console.log('onPostImageForSalon imageForSalon:', imageForSalon);
    }),
    onChangeUploadImageForSalon: useCallback(() => {
      let inputFile = document.querySelector('.carousel__add-img-input').files[0]
      console.log('onChangeUploadImageForSalon');
      // console.log('document.querySelector inputFile :', inputFile);
      setImageForSalon({ ...imageForSalon, img: inputFile });
    }),
  }
  // carousel__add-img-input
  const renders = {
    yandexMap: <YandexMap center={[53.21624037527426, 50.13260255066459]}
      zoom={12} items={[[53.21624037527426, 50.13260255066459]]} />
  }

  return (
    <div className='salon-admine-office'>
      <div className="container">
        <div className="salon-admine-office__flex">
          <div className="salon-admine-office__wrapp-salon-card">
            <SalonCard
              salonTitle={"Салон-красоты «Версаль»"}
              city={{ name: "Москва" }}
              address={"ул. Костина, 6/1, 3 этаж (м. Красносельская)"}
              colorTitle={"#F5BFAB"}
              bkgInfo={"#410935"}
              workinghours={"с 10:00 до 20:00 без выходных"}
              parking={"Бесплатная гостевая парковка"}
              telephone={"(495) 123-45-67"}
              deliverableGgroups={[
                { name: "Косметология" },
                { name: "Парикмахерские услуги" },
                { name: "Макияж / брови / ресницы" },
                { name: "Педикюр" },
                { name: "Маникюр" },
              ]}
              isEdited={true}
              // textLink,
              // bckCallBtn,
              // colorTextCallBtn,
              // bkgRecordBtn,
              // colorTextRecordBtn,
              // img,
              map={renders.yandexMap}
              onClickEditing={callbacks.onSetIsActiveEditingSalonModal}
            // onClick
            />
          </div>
          <div className="salon-admine-office__wrapp-carousel">
            <Carousel
              images={[{ img: img1 }, { img: img2 },]} //{ img: img3 }, { img: img1 }
              isEdited
              onClick={callbacks.onPostImageForSalon}
              onChange={callbacks.onChangeUploadImageForSalon}
            />
          </div>
          <div className="salon-admine-office__wrapp-master-add-card">
            <MasterAddCard />
          </div>

          <div className="salon-admine-office__masters">
            <p className="salon-admine-office__masters-title">Мастера салона:</p>
            <div className="salon-admine-office__wrapp-master-card"></div>
            <div className="salon-admine-office__wrapp-pagination">
              <Pagination />
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