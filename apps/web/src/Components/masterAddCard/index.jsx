import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { getAllDeliverablesThunk } from '../../actions/deliverablesActions';
import { postImageFormMasterThunk, postNewMasterThunk } from '../../actions/mastersActions';
import Button from '../Button';
import imgCam from './img/camera.png';
import './master-add-card.scss';

function MasterAddCard({
  onClick
}) {
  const select = useSelector((store) => ({
    deliverables: store.deliverablesReducer.deliverables,
    imgForFaceMasterId: store.mastersReducer.imgForFaceMasterId,
  }));
  const [formImgForMaster, setFormImgForMaster] = useState(null);
  const [formForAddMasterInSalon, setFormForAddMasterInSalon] = useState({
    fileId: null,                         // {number} - id картинки для лица мастера
    userId: 49,                           // {number} - id пользователя
    profession: 'profession',             // {string} - название профессии
    description: 'description',           // {string} - описание мастера
    shops: [4],                           // {[number]} - id салона
    deliverables: [1, 3],                 // {[number]} - id услуг
  });
  // {
  //   fileId: null,                       // {number} - id картинки для лица мастера
  //   userId: 48,                         // {number} - id пользователя
  //   profession: null,                   // {string} - название профессии
  //   description: null,                  // {string} - описание мастера
  //   shops: [4],                         // {[number]} - id салона
  //   deliverables: [],                   // {[number]} - id услуг
  // }
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDeliverablesThunk());
  }, []);

  useEffect(() => {
    // console.log('MasterAddCard formForAddMasterInSalon', formForAddMasterInSalon);

    // setFormForAddMasterInSalon({ ...formForAddMasterInSalon, fileId: select.imgForFaceMasterId });
    // console.log('MasterAddCard formForAddMasterInSalon', formForAddMasterInSalon)
  }, [formForAddMasterInSalon]);

  const handleChangeUploadImg = (e) => {
    setFormImgForMaster(e.currentTarget.files[0]);
  }

  const handleChangeServicesCheckbox = (e) => {

    let id = e.currentTarget.dataset.serviceId;
    let servicesList = [...formForAddMasterInSalon.deliverables];
    let index = servicesList.indexOf(id, 0);

    if (index == -1) {

      setFormForAddMasterInSalon({
        ...formForAddMasterInSalon,
        deliverables: [
          ...formForAddMasterInSalon.deliverables,
          id
        ]
      });
    } else {

      servicesList.splice(index, 1);
      setFormForAddMasterInSalon({
        ...formForAddMasterInSalon,
        deliverables: [
          ...servicesList
        ]
      });
    }
  }

  const handleChangeInputText = (e) => {
    let current = e.currentTarget.id;
    let currentValue = e.currentTarget.value;
    switch (current) {
      case "master-id":
        setFormForAddMasterInSalon({
          ...formForAddMasterInSalon,
          userId: +currentValue,
          fileId: select.imgForFaceMasterId
        });
        break;
      case "master-profession":
        setFormForAddMasterInSalon({ ...formForAddMasterInSalon, profession: currentValue })
        break;
      case "master-desk":
        setFormForAddMasterInSalon({ ...formForAddMasterInSalon, description: currentValue })
        break;
      default:
        break;
    }
  }

  const callbacks = {
    onGetAllDeliverables: useCallback(() => {
    }),
    onPostImageForMaster: useCallback(() => {
      dispatch(postImageFormMasterThunk(formImgForMaster));
    }),
    onPostNewMaster: useCallback(() => {
      dispatch(postNewMasterThunk(formForAddMasterInSalon));
      // let delivList = document.querySelector('.master-add-card__info-services-list').querySelectorAll('input');
      // let delivListChecked
      // console.log('MasterAddCard onPostNewMaster delivList: ', delivList)
      // console.log('MasterAddCard onPostNewMaster: ', formForAddMasterInSalon)
    }),
  }

  return (
    <div className="master-add-card">
      <div className="master-add-card__title">
        Добавить мастера:
      </div>
      <div className="master-add-card__flex">
        <div className="master-add-card__img-upload">

          <div className="master-add-card__img-upload-pic">
            <img className="master-add-card__img-upload-pic-pic" src={imgCam} alt="Фотоаппарат" />
            <p className="master-add-card__img-upload-desc">Добавить фото</p>
          </div>
          <div
            className="master-add-card__img-upload-wrapp-button"
            style={{ position: "absolute", left: '8px', bottom: '10px', zIndex: '2' }}
          >
            <Button
              background={"#410935"}
              colorText={"#FFFFFF"}
              onClick={callbacks.onPostImageForMaster}
            >Отправить</Button>
          </div>
          <input
            className="master-add-card__img-upload-input"
            type="file"
            accept="image/*"
            name='file'
            // accept="image/png, image/jpeg"
            onChange={handleChangeUploadImg}
          />
        </div>

        <div className="master-add-card__info">
          <div className="master-add-card__info-id master-add-card__info-item">
            <label
              className="master-add-card__info-id-label"
              htmlFor="master-name"
            >
              Идентификатор:
            </label>
            <input
              id="master-id"
              className="master-add-card__info-id-input"
              name="master-id"
              type="text"
              placeholder='Введите идентификатор пользователя'
              onChange={handleChangeInputText}
            />
          </div>

          <div className="master-add-card__info-profession master-add-card__info-item">
            <label
              className="master-add-card__info-profession-label"
              htmlFor="master-profession"
            >
              Профессия:
            </label>
            <input
              id="master-profession"
              className="master-add-card__info-profession-input"
              name="master-profession"
              type="text"
              placeholder='мастер парикмахер'
              onChange={handleChangeInputText}
            />
          </div>

          <div className="master-add-card__info-desk master-add-card__info-item">
            <label
              className="master-add-card__info-desk-label"
              htmlFor="master-desk"
            >
              Описание:
            </label>
            <textarea
              id="master-desk"
              className="master-add-card__info-desk-textarea"
              name="desk"
              placeholder='Не много информации о себе'
              onChange={handleChangeInputText}
            />
          </div>

          <div className="master-add-card__info-services master-add-card__info-item">
            <div
              className="master-add-card__info-services-label"
            >
              Услуги мастера:
            </div>
            <div
              className="master-add-card__info-services-list"
              ref={inputRef}
            >
              {select.deliverables?.map((el) => {
                return <label htmlFor={`service-${el.id}`} key={el.id}>
                  <input
                    id={`service-${el.id}`}
                    data-service-id={el.id}
                    type="checkbox"
                    onChange={handleChangeServicesCheckbox}
                  />
                  {el.name}
                </label>
              })}
            </div>
          </div>

        </div>
      </div>

      <div className="master-add-card__wrapp-button">
        <Button
          background={"#410935"}
          colorText={"#FFFFFF"}
          onClick={callbacks.onPostNewMaster}
        >Сохранить</Button>
      </div>

    </div>
  )
}

MasterAddCard.propTypes = {
  onClick: propTypes.func
}

MasterAddCard.defaultProps = {
  onClick: () => { }
}

export default React.memo(MasterAddCard);