import React, { useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import './sign-in.scss'

function SignIn({
  linkTo,
  children,
  onClick,
}) {

  const location = useLocation();

  const handleClick = () => {
    onClick();
  }

  return (
    <button
      className="sign-in"
      onClick={handleClick}
    >
      <NavLink
        end
        className={({ isActive }) => isActive ? "navigation__item-link navigation__item-link--active" : "navigation__item-link"}
        style={{ color: '#FFFFFF' }}
        to={linkTo ? linkTo : location.pathname}
      >
        <span>{children}</span>
      </NavLink>

    </button>
  )
}

SignIn.propTypes = {
  linkTo: propTypes.string,
  children: propTypes.string,
  onClick: propTypes.func,
}

SignIn.defaultProps = {
  onClick: () => { }
}

export default React.memo(SignIn);