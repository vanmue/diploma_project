import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import './navigation.scss'

function Navigation() {
  const color = useSelector((store) => store.stylesReducer.navigation.color);
  useEffect(() => {
  }, [color]);

  return (
    <ul className="navigation">
      <li className="navigation__item">
        <NavLink
          className={({ isActive }) => isActive ? "navigation__item-link navigation__item-link--active" : "navigation__item-link"}
          style={{ color: `${color}` }}
          end
          to="/"
        >
          Главная
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink
          className={({ isActive }) => isActive ? "navigation__item-link navigation__item-link--active" : "navigation__item-link"}
          style={{ color: `${color}` }}
          to="/salons"
        >
          Салоны
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink
          className={({ isActive }) => isActive ? "navigation__item-link navigation__item-link--active" : "navigation__item-link"}
          style={{ color: `${color}` }}
          end
          to="/master"
        >
          Мастера
        </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink
          className={({ isActive }) => isActive ? "navigation__item-link navigation__item-link--active" : "navigation__item-link"}
          style={{ color: `${color}` }}
          to="/contacts"
        >
          Стать партнёром
        </NavLink>
      </li>
    </ul>
  )
}

export default React.memo(Navigation);