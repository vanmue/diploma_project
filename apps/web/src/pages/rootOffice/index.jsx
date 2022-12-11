import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import propTypes from 'prop-types';
import FormForSalon from "../../Components/FormForSalon";
import './root-office.scss'

function RootOffice({
}) {

  const select = useSelector(store => ({
  }));
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useDispatch();

  const handleClickShowFormSalon = () => {
    setIsHidden(prevIsHidden => !prevIsHidden);
  }

  const callbacks = {
    onSetIsHiddenFormSalon: useCallback(() => setIsHidden(prevIsHidden => !prevIsHidden)),
  }

  return (
    <div className="root-office">
      <div className="root-office__form-salon">
        <button onClick={handleClickShowFormSalon}>Форма создания салона</button>
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