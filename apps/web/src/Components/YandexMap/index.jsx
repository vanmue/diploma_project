import React from 'react';
import { useState, useEffect } from 'react';
import yandexMap from './img/yandex-map.jpg'
import './yandex-map.scss';

function YandexMap() {
  const [triger, setTriger] = useState([55.77413254937618, 37.78757273947948]);
  // console.log(document.querySelector('.yandex-map__body').childNodes == null)
  useEffect(() => {
    // console.log("1")
    window.ymaps.ready(function () {
      return new window.ymaps.Map('map', {
        center: triger,
        zoom: 13
      });
    });
    if (document.querySelector('.yandex-map__body').childNodes.length > 1) {
      // console.log("if")
      document.querySelector('.yandex-map__body').childNodes[0].remove();
    }
    // return () => {
    //   console.log("return:")
    // }
  }, []);

  useEffect(() => {

  }, [triger]);

  return (
    <div className="yandex-map">
      <div className="container">
        <div
          id="map"
          className="yandex-map__body"
          style={{ height: "546px" }}
        >
        </div>
      </div>
    </div>
  )
}

export default React.memo(YandexMap);