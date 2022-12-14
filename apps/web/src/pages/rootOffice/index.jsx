import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import propTypes from 'prop-types';
import { postSetRoleShopManagerThunk } from "../../actions/salonsAction";
import FormForSalon from "../../Components/FormForSalon";
import './root-office.scss'

function RootOffice({
}) {

  const select = useSelector(store => ({
  }));
  const [isHidden, setIsHidden] = useState(false);
  const [formSetRoleShopManager, setFormSetRoleShopManager] = useState({
    userId: null,
    profile_type: "shop_manager"
  });
  const [redirId, setRedirId] = useState({
    userId: null,
    masterId: null,
    salonId: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickBtnApplyRole = () => {
    console.log("formSetRoleShopManager:", formSetRoleShopManager);
    dispatch(postSetRoleShopManagerThunk(formSetRoleShopManager));
  }

  const handleClickShowFormSalon = () => {
    setIsHidden(prevIsHidden => !prevIsHidden);
  }

  const handleChangeUserIdInput = (e) => {
    setFormSetRoleShopManager({ ...formSetRoleShopManager, userId: +e.currentTarget.value });
  }

  const handleChangeRedirInputId = (e) => {

    let name = e.currentTarget.getAttribute("name");
    let value = e.currentTarget.value;

    switch (name) {
      case "user-input-id": {
        setRedirId({ ...redirId, userId: +value });
        break;
      }
      case "master-input-id": {
        setRedirId({ ...redirId, masterId: +value });
        break;
      }
      case "admin-input-id": {
        setRedirId({ ...redirId, salonId: +value });
        break;
      }
      default:
        break;
    }
  }

  const handleClickBtnRedirProfile = (e) => {

    let dataset = e.currentTarget.dataset.btnRedir;

    switch (dataset) {
      case "user": {
        localStorage.setItem("profilId", JSON.stringify({ userId: redirId.userId, masterId: null, salonId: null }));
        navigate("/user-office", {})
        break;
      }
      case "master": {
        localStorage.setItem("profilId", JSON.stringify({ userId: null, masterId: redirId.masterId, salonId: null }));
        navigate("/master-office", {});
        break;
      }
      case "admin": {
        localStorage.setItem("profilId", JSON.stringify({ userId: null, masterId: null, salonId: redirId.salonId }));
        navigate("/salon-admine-office", {});
        break;
      }
      default:
        break;
    }
  }

  const callbacks = {
    onSetIsHiddenFormSalon: useCallback(() => setIsHidden(prevIsHidden => !prevIsHidden)),
  }

  const renders = {
    linksToProfiles: [
      { profile: "user", textBtn: "в ЛК customer", textLabel: "id user" },
      { profile: "master", textBtn: "в ЛК master", textLabel: "id master" },
      { profile: "admin", textBtn: "в ЛК admine", textLabel: "id salon" }
    ].map((el, i) => {

      let headClass = `root-office__redirect-${el.profile} root-office__all-office-nav-item`;
      let labelClass = `root-office__redirect-${el.profile}-label`;
      let labelFor = `${el.profile}-input-id`;
      let inputClass = `root-office__redirect-${el.profile}-input`;
      let inputName = `${el.profile}-input-id`;
      let btnClass = `root-office__redirect-${el.profile}-btn root-office__btn`;

      return <div className={headClass} key={i}>
        <label
          className={labelClass}
          htmlFor={labelFor}
        >
          {el.textLabel}:
        </label>
        <input
          className={inputClass}
          name={inputName}
          type="text"
          onChange={handleChangeRedirInputId}
        />

        {/* <Link to={"/user-office"}> */}
        <button
          className={btnClass}
          data-btn-redir={el.profile}
          onClick={handleClickBtnRedirProfile}
        >
          {el.textBtn}
        </button>
        {/* </Link> */}
      </div>

    })
  }

  return (
    <div className="root-office">
      <div className="container">
        <div className="root-office__set-role">
          <h2 className="root-office__h2">Установка роли</h2>
          <label
            className="root-office__set-role-label"
            htmlFor="root-office-user-id"
          >
            userId:
          </label>
          <input
            id="root-office-user-id"
            className="root-office__set-role-input"
            name="root-office-user-id"
            type="text"
            onChange={handleChangeUserIdInput}
          />
          <button
            className="root-office__set-role-apply root-office__btn"
            onClick={handleClickBtnApplyRole}
          >
            SET role "shop_manager"
          </button>

        </div>
        <div className="root-office__form-salon">
          <h2 className="root-office__h2">Регистрация салона</h2>
          <button
            className="root-office__form-salon-btn root-office__btn"
            onClick={handleClickShowFormSalon}
          >
            Форма создания салона
          </button>
          <div className="root-office__wrapp-form-for-salon ">
            {isHidden ? <FormForSalon
              req="POST"
              onClickClose={callbacks.onSetIsHiddenFormSalon}
            />
              : ""}
          </div>
        </div>
        <div className="root-office__all-office-nav">
          <h2 className="root-office__h2">Переходы в ЛК</h2>

          {renders.linksToProfiles}
        </div>
      </div>
    </div>
  )
}

// RootOffice.propTypes = {
// }

// RootOffice.defaultProps = {
// }

export default React.memo(RootOffice);