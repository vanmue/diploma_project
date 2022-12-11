import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();

  const handleClickShowFormSalon = () => {
    setIsHidden(prevIsHidden => !prevIsHidden);
  }

  const handleChangeUserIdInput = (e) => {
    setFormSetRoleShopManager({ ...formSetRoleShopManager, userId: +e.currentTarget.value });
  }

  const handleClickBtnApplyRole = () => {
    console.log("formSetRoleShopManager:", formSetRoleShopManager);
    dispatch(postSetRoleShopManagerThunk(formSetRoleShopManager));
  }

  const callbacks = {
    onSetIsHiddenFormSalon: useCallback(() => setIsHidden(prevIsHidden => !prevIsHidden)),
  }

  return (
    <div className="root-office">
      <div className="root-office__set-role">

        <label
          className="root-office__set-role-label"
          htmlFor="root-office-user-id"
        >
          id пользователя:
        </label>
        <input
          id="root-office-user-id"
          className="root-office__set-role-input"
          name="root-office-user-id"
          type="text"
          onChange={handleChangeUserIdInput}
        />
        <button
          className="root-office__set-role-apply"
          onClick={handleClickBtnApplyRole}
        >
          Присвоить роль "shop_manager"
        </button>

      </div>
      <div className="root-office__form-salon">
        <button className="root-office__form-salon-btn" onClick={handleClickShowFormSalon}>Форма создания салона</button>
        <div className="root-office__wrapp-form-for-salon">
          {isHidden ? <FormForSalon
            req="POST"
            onClickClose={callbacks.onSetIsHiddenFormSalon}
          />
            : ""}
        </div>
      </div>

    </div>
  )
}

RootOffice.propTypes = {
}

RootOffice.defaultProps = {
}

export default React.memo(RootOffice);