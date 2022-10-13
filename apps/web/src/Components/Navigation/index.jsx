import React from "react";
import { NavLink } from 'react-router-dom'
import './navigation.scss'

function Navigation() {
  return (
    <ul className="navigation">
      <li className="navigation__item">
        <NavLink
          className="navigation__item-link" to="/">Главная </NavLink>
      </li>
      <li className="navigation__item">
        <NavLink className="navigation__item-link" to="/">Салоны</NavLink>
      </li>
      <li className="navigation__item">
        <NavLink className="navigation__item-link" to="/">Мастера</NavLink>
      </li>
      <li className="navigation__item">
        <NavLink className="navigation__item-link" to="/contacts">Стать партнёром</NavLink>
      </li>
    </ul>
  )
}

export default React.memo(Navigation);