import React from "react";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Select from "../Select";
import './services.scss'

function Services() {
  const cities = useSelector(store => store.citiesReducer)
  return (
    <div className="services">
      <div className="container">
        <div className="services__body">
          <div className="services__desc">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In arcu nibh vitae amet. Ipsum, pharetra donec ornare velit. Id at quisque accumsan risus ac ipsum ut. Sit elit, facilisi proin non malesuada sociis tristique. Viverra augue lorem ut quisque quam tortor, malesuada iaculis.
            </p>
            <p>
              Et elementum at nulla venenatis, faucibus integer. Auctor neque eros, viverra rutrum. Fames ultrices condimentum tortor nec penatibus. Velit imperdiet sapien fringilla vestibulum sit fames.
            </p>
          </div>
          <h3 className="services__h3">Найди своего мастера</h3>
          <div className="services__wrapp-select">
            <Select
              titleSelect={"Выберите город"}
              cities={cities.cities}
            />
          </div>
          <h2 className="services__h2">Услуги</h2>
          <div className="services__list">
            <Link className="services__list-item">
              <div className="services__list-item-title">
                Парикмахерские услуги
              </div>
            </Link>
            <Link className="services__list-item">
              <div className="services__list-item-title">
                Маникюр
              </div>
            </Link>
            <Link className="services__list-item">
              <div className="services__list-item-title">
                Педикюр
              </div>
            </Link>
            <Link className="services__list-item">
              <div className="services__list-item-title">
                Брови и Ресницы
              </div>
            </Link>
            <Link className="services__list-item">
              <div className="services__list-item-title">
                Косметология
              </div>
            </Link>
            <Link className="services__list-item">
              <div className="services__list-item-title">
                SPA
              </div>
            </Link>
            <Link className="services__list-item">
              <div className="services__list-item-title">
                Макияж
              </div>
            </Link>
            <Link className="services__list-item">
              <div className="services__list-item-title">
                Эпиляция
              </div>
            </Link>
            <Link className="services__list-item">
              <div className="services__list-item-title">
                Услуги для мужчин
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Services);