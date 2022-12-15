import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { postNewUserThunk, postloginThunk, getAuthThunk, isLoginAction } from "../../actions/authorizationActions";
import Button from "../Button";
import './sign-in-modal.scss';

function SignInModal({
  isActive,
  onClick
}) {

  const [formRegistrationIsActive, setFormRegistrationIsActive] = useState(false);
  const [formSignIn, setFormSignIn] = useState({
    email: "",
    password: ""
  });
  const [formRegistration, setFormRegistration] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    avatarId: 1
  });
  const dispatch = useDispatch();

  const handleClickBtnClose = () => {
    onClick();
  }

  const handleClickToggleForm = () => {
    setFormRegistrationIsActive(prevFormRegistrationIsActive => !prevFormRegistrationIsActive);
  }

  const handleChangeInput = (e) => {

    const name = e.currentTarget.getAttribute('name');
    const value = e.currentTarget.value;
    switch (name) {
      case 'email':
        setFormSignIn({ ...formSignIn, email: value });
        setFormRegistration({ ...formRegistration, email: value });
        break;
      case 'password':
        setFormSignIn({ ...formSignIn, password: value });
        setFormRegistration({ ...formRegistration, password: value });
        break;
      case 'name':
        setFormRegistration({ ...formRegistration, name: value });
        break;
      case 'surname':
        setFormRegistration({ ...formRegistration, surname: value });
        break;
      default:
        break;
    }
  }

  const callbacks = {
    onSubmitFormSignIn: useCallback(() => {
      console.log('onSubmitFormSignIn :')
      dispatch(postloginThunk(formSignIn));
    }),
    onSubmitFormRegistration: useCallback(() => {
      console.log('onSubmitFormRegistration :')
      dispatch(postNewUserThunk(formRegistration));
    }),
  }


  const renders = {
    /**
     * @param {['email', 'password','name','surname']} arr - имена inputs 
    */
    inputs: (arr) => arr.map((el, index) => {
      let passeInput = el;

      let classN = `sign-in-modal__${el} sign-in-modal__user-data-item`;
      let name = el;
      let placeholder = el;
      return <input
        className={classN}
        type={passeInput == "password" ? "password" : "text"}
        name={name}
        placeholder={placeholder}
        required
        key={index}
        onChange={handleChangeInput}
      />
    })
  }

  return (
    <div
      className="sign-in-modal"
    >
      <div className="sign-in-modal__user-data">
        {formRegistrationIsActive ?
          renders.inputs(['name', 'surname', 'email', 'password']) :
          renders.inputs(['email', 'password'])
        }
      </div>
      <button
        className="sign-in-modal__toogle-btn"
        onClick={handleClickToggleForm}
      >
        {formRegistrationIsActive ? 'Войти' : 'Регестрация'}
      </button>

      <div className="sign-in-modal__wrapp-button-registration">
        <Button
          colorText='#FFFFFF'
          background='#A40123'
          onClick={formRegistrationIsActive ? callbacks.onSubmitFormRegistration : callbacks.onSubmitFormSignIn}
        >
          {formRegistrationIsActive ? 'Зарегестрироваться' : 'Войти'}
        </Button>
      </div>
      <div
        className="sign-in-modal__btn-close"
        onClick={handleClickBtnClose}
      >
      </div>
    </div >
  )
}

SignInModal.propTypes = {
  linkTo: propTypes.string,
  onClick: propTypes.func,
}

SignInModal.defaultProps = {
  onClick: () => { }
}

export default React.memo(SignInModal);