import React, { useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import './navigation.scss'

function Navigation() {

  const location = useLocation();

  const select = useSelector((store) => ({
    navColor: location.pathname == '/' ? store.stylesReducer.navigation.colorWhite : store.stylesReducer.navigation.darkViolet,
  }));

  useEffect(() => {
  }, [select.color]);

  return (
    <ul className="navigation">
      <li className="navigation__item">
        <NavLink
          end
          className={({ isActive }) => isActive ? "navigation__item-link navigation__item-link--active" : "navigation__item-link"}
          style={{ color: `${select.navColor}` }}
          to="/"
        >
          Главная
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink
          className={({ isActive }) => isActive ? "navigation__item-link navigation__item-link--active" : "navigation__item-link"}
          style={{ color: `${select.navColor}` }}
          to="/salons"
        >
          Салоны
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink
          className={({ isActive }) => isActive ? "navigation__item-link navigation__item-link--active" : "navigation__item-link"}
          style={{ color: `${select.navColor}` }}
          to="/masters"
        >
          Мастера
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink
          className={({ isActive }) => isActive ? "navigation__item-link navigation__item-link--active" : "navigation__item-link"}
          style={{ color: `${select.navColor}` }}
          to="/master"
        >
          Стать партнёром
        </NavLink>
      </li>
    </ul>
  )
}

export default React.memo(Navigation);