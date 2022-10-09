import React from "react";
import { NavLink } from 'react-router-dom'
import './navbar.scss'

function NavBar() {
  function handleScroll() {
    const heightItem = window.screen.height
    setTimeout(() => {
      window.scrollTo(0, heightItem)
    }, 50)

  }

  return (
    <>
      <ul className="nav-bar">
        <li><NavLink to="/" >Главная</NavLink></li>
        <li><NavLink to="/" onClick={handleScroll}>Мастера</NavLink></li>
        <li><NavLink to="/contacts">Контакты</NavLink></li>
      </ul>
    </>
  )
}

export default NavBar