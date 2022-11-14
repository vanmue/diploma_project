import React from "react";
import './sign-in.scss'
import { NavLink } from 'react-router-dom';

function SignIn() {
  return (
    <button className="sign-in">
      <NavLink
        end
        className={({ isActive }) => isActive ? "navigation__item-link navigation__item-link--active" : "navigation__item-link"}
        style={{ color: '#FFFFFF' }}
        to="/user-office"
      >
        <span>Личный кабинет</span>
      </NavLink>

    </button>
  )
}

export default React.memo(SignIn);