import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeNavigationColorAction, changingLabelInHeaderAction, changeHeaderBackgroundAction } from '../../actions/stylesActions';
import SalonCard from '../../Components/SalonCard';
import YandexMap from '../../Components/YandexMap';
import Button from '../../Components/Button';
import Carousel from '../../Components/Carousel';
import MasterAddCard from '../../Components/masterAddCard';
import img1 from '../../Components/Carousel/img/carusel-img-1.jpg';
import img2 from '../../Components/Carousel/img/carusel-img-2.jpg';
import img3 from '../../Components/Carousel/img/carusel-img-3.jpg';
import './salon-admin-office.scss';

function SalonAdminOffice() {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changingLabelInHeaderAction(false));
    dispatch(changeHeaderBackgroundAction('#F5BFAB'));
    dispatch(changeNavigationColorAction('#410935'));

  }, []);

  const handleClickBtnCloseModal = () => {
    setIsActiveModal(prevIsActiveModal => !prevIsActiveModal);
  }

  const callbacks = {
    onSetIsActiveEditingSalonModal: useCallback(() => {
      setIsActiveModal(prevIsActiveModal => !prevIsActiveModal);
    })
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
            />
          </div>
          <div className="salon-admine-office__wrapp-master-add-card">
            <MasterAddCard />
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
                type="text" />
            </div>
            <div className="salon-admine-office__editing-salon-city salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-city-label"
                htmlFor="salon-city">
                Название города:
              </label>
              <input
                id="salon-city"
                className="salon-admine-office__editing-salon-city-input"
                name="city"
                type="text" />
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
                type="text" />
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
                type="text" />
            </div>
            <div className="salon-admine-office__editing-salon-parking salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-parking-label"
                htmlFor="salon-parking">
                Парковка:
              </label>
              <input
                id="salon-parking"
                className="salon-admine-office__editing-salon-parking-input"
                name="parking"
                type="text" />
            </div>
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
                type="text" />
            </div>
            <div className="salon-admine-office__editing-salon-latitude salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-latitude-label"
                htmlFor="salon-latitude">
                Геог-кая широта:
              </label>
              <input
                id="salon-latitude"
                className="salon-admine-office__editing-salon-latitude-input"
                name="latitude"
                type="text" />
            </div>
            <div className="salon-admine-office__editing-salon-longitude salon-admine-office__editing-salon-item">
              <label
                className="salon-admine-office__editing-salon-longitude-label"
                htmlFor="salon-longitude">
                Геог-кая долгота:
              </label>
              <input
                id="salon-longitude"
                className="salon-admine-office__editing-salon-longitude-input"
                name="longitude"
                type="text" />
            </div>
            <div className="salon-admine-office__editing-salon-wrapp-button">
              <Button
                background={"#410935"}
                colorText={"#FFFFFF"}
              >Сохранить</Button>
            </div>
          </div> : ""}
        </div>
      </div>
    </div>
  )
}

export default React.memo(SalonAdminOffice);