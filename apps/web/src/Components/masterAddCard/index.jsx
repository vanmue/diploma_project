import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { getAllDeliverablesThunk } from '../../actions/deliverablesActions';
import { postImageFormMasterThunk, postNewMasterThunk, postSetRoleThunk } from '../../actions/mastersActions';
import Button from '../Button';
import imgCam from './img/camera.png';
import './master-add-card.scss';

function MasterAddCard({
  onClick
}) {
  const select = useSelector((store) => ({
    deliverables: store.deliverablesReducer.deliverables,
    imgForFaceMasterId: store.mastersReducer.imgForFaceMasterId,
    responsePostSetRoleMaster: store.mastersReducer.responsePostSetRoleMaster,
    activeSalonId: store.salonsReducer.activeSalonId,
  }));

  const [fileUrl, setFileUrl] = useState(null);
  const [formImgForMaster, setFormImgForMaster] = useState(null);
  const [formForAddMasterInSalon, setFormForAddMasterInSalon] = useState({
    fileId: null,                         // {number} - id картинки для лица мастера
    userId: null,                         // {number} - id пользователя
    profession: null,                     // {string} - название профессии
    description: null,                    // {string} - описание мастера
    shops: [+localStorage.getItem("activeSalonId")],                           // {[number]} - id салона
    deliverables: [],                     // {[number]} - id услуг
    working_start: null,                  // {string} - начало работы мастера
    working_end: null,                    // {string} - окончание работы мастера
  });
  const [formSetRoleMaster, setFormSetRoleMaster] = useState({
    profile_type: "master",               // {string} - роль
    userId: null                          // {number} - id ьастера
  });
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getAllDeliverablesThunk()); }, []);
  useEffect(() => {
    setFormForAddMasterInSalon({ ...formForAddMasterInSalon, shops: [select.activeSalonId] });
  }, [select.activeSalonId]);
  useEffect(() => {
    if (select.responsePostSetRoleMaster != null) {
      dispatch(postNewMasterThunk(formForAddMasterInSalon));
    }
  }, [select.responsePostSetRoleMaster]);

  useEffect(() => {
    setFormForAddMasterInSalon({ ...formForAddMasterInSalon, fileId: +select.imgForFaceMasterId });
  }, [select.imgForFaceMasterId]);

  const handleChangeUploadImg = (e) => {
    let inputFile = e.currentTarget.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(inputFile);
    reader.onload = function () {
      console.log("reader.onload", reader.result)
      setFileUrl(reader.result);
    }

    setFormImgForMaster(e.currentTarget.files[0]);
  }

  //Добавление услуг к создаваемому мастеру
  const handleChangeServicesCheckbox = (e) => {

    let id = +e.currentTarget.dataset.serviceId;
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

  //Обработка onChange при заполнении полей мастера
  const handleChangeInputText = (e) => {
    let current = e.currentTarget.id;
    let currentValue = e.currentTarget.value;
    switch (current) {
      case "master-id":
        setFormForAddMasterInSalon({
          ...formForAddMasterInSalon,
          userId: +currentValue
        });
        setFormSetRoleMaster({
          ...formSetRoleMaster,
          userId: +currentValue
        });
        break;
      case "master-profession":
        setFormForAddMasterInSalon({ ...formForAddMasterInSalon, profession: currentValue })
        break;
      case "master-working-start":
        setFormForAddMasterInSalon({ ...formForAddMasterInSalon, working_start: currentValue })
        break;
      case "master-working-end":
        setFormForAddMasterInSalon({ ...formForAddMasterInSalon, working_end: currentValue })
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
    onSetRoleMaster: useCallback(() => {
      dispatch(postSetRoleThunk(formSetRoleMaster));
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
            style={{ opacity: fileUrl != null ? 1 : 0, backgroundImage: fileUrl != null ? `url(${fileUrl})` : "" }}
            className="master-add-card__img-upload-input"
            type="file"
            accept="image/*"
            name='file'
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

          <div className="master-add-card__info-working-time master-add-card__info-item">
            <label className="master-add-card__info-working-time-label">
              Время работы:
            </label>
            <div className="master-add-card__info-working-time-inputs">
              <input
                id="master-working-start"
                className="master-add-card__info-working-start-input"
                name="master-working-start"
                type="text"
                placeholder='Начало работы'
                onChange={handleChangeInputText}
              />
              <input
                id="master-working-end"
                className="master-add-card__info-working-end-input"
                name="master-working-end"
                type="text"
                placeholder='Окончание работы'
                onChange={handleChangeInputText}
              />
            </div>
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
          onClick={callbacks.onSetRoleMaster}
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