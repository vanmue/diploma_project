import React from "react";
import { NavLink, Link } from 'react-router-dom'
import './navigation.scss'

function Navigation() {
  return (
    <ul className="navigation">
      <li className="navigation__item">
        <Link className="navigation__item-link" to="/" >Главная</Link>
      </li>
      <li className="navigation__item">
        <Link className="navigation__item-link" to="/">Салоны</Link>
      </li>
      <li className="navigation__item">
        <Link className="navigation__item-link" to="/">Мастера</Link>
      </li>
      <li className="navigation__item">
        <Link className="navigation__item-link" to="/contacts">Стать партнёром</Link>
      </li>
    </ul>
  )
}

export default React.memo(Navigation);