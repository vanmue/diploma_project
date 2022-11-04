import React from 'react';
import { useEffect } from 'react';
import propTypes from 'prop-types';
import './yandex-map.scss';

function YandexMap({
  center,
  zoom,
  items
}) {

  let myMap;

  useEffect(() => {
    window.ymaps.ready(function init() {

      if (document.querySelector('.yandex-map__body').children.length === 0) {
        newYmaps(center, zoom);
      } else if (document.querySelector('.yandex-map__body').children.length === 1) {
        document.querySelector('.yandex-map__body').children[0].remove();
        newYmaps(center, zoom);
      }

      items.forEach((item) => {
        myMap.geoObjects.add(new window.ymaps.Placemark(item), {}, {});
      })
    });
  }, [center, zoom, items]);

  /**
   * Создание новой карты
   * @param {array} c центр карты
   * @param {number} z приближение карты(масштаб, zoom)
  */
  function newYmaps(c, z) {
    myMap = new window.ymaps.Map('map', {
      center: c,
      zoom: z
    });
  }

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

YandexMap.defaultProps = {
  center: [],
  zoom: 12,
  items: []
}

export default React.memo(YandexMap);