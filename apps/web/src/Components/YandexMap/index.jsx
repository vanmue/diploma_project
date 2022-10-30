import React from 'react';
import { useEffect } from 'react';
import propTypes from 'prop-types';
import './yandex-map.scss';

function YandexMap({
  center,
  zoom,
  items
}) {

  useEffect(() => {

    // myMap.destroy();
    window.ymaps.ready(function init() {

      let myMap;

      if (document.querySelector('.yandex-map__body').children.length === 0) {
        myMap = new window.ymaps.Map('map', {
          center: center,
          zoom: zoom
        });
      } else if (document.querySelector('.yandex-map__body').children.length === 1) {
        document.querySelector('.yandex-map__body').children[0].remove();
        myMap = new window.ymaps.Map('map', {
          center: center,
          zoom: zoom
        });
      }

      items.forEach((item) => {
        myMap.geoObjects.add(new window.ymaps.Placemark(item), {}, {});
      })
    });
  }, [center, zoom, items]);

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

YandexMap.propTypes = {
  center: propTypes.array,
  zoom: propTypes.number,
  items: propTypes.arrayOf(propTypes.array)
}

export default React.memo(YandexMap);