import React, { useState, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
// import prev from './img/arrow-prev.svg';
// import next from './img/arrow-next.svg';
// import prev from './img/arrow-prev.png';
// import next from './img/arrow-next.png';
import './carousel.scss';

function Carousel({
  images,
  isEdited
}) {
  const [offset, setOffset] = useState(0);
  const carouselLineRef = useRef(null);

  const handleClickPrev = () => {
    offset == 0 ? setOffset(-1320 * (Math.ceil(images?.length / 3) - 1)) : setOffset(prevOffset => prevOffset + 1320);
  }

  const handleClickNext = () => {
    Math.abs(offset) == 1320 * (Math.ceil(images?.length / 3) - 1) ? setOffset(0) : setOffset(prevOffset => prevOffset - 1320);
  }

  return (
    <div className="carousel">
      <button
        className="carousel__btn-prev"
        onClick={handleClickPrev}
      >
        <svg width="19" height="34" viewBox="0 0 19 34" fill="none">
          <path d="M15.9393 33.0607C16.5251 33.6464 17.4749 33.6464 18.0607 33.0607C18.6464 32.4749 18.6464 31.5251 18.0607 30.9393L15.9393 33.0607ZM2 17L0.939339 15.9393C0.658033 16.2206 0.5 16.6022 0.5 17C0.5 17.3978 0.658033 17.7794 0.939339 18.0607L2 17ZM18.0607 3.06066C18.6464 2.47487 18.6464 1.52513 18.0607 0.93934C17.4749 0.353553 16.5251 0.353553 15.9393 0.93934L18.0607 3.06066ZM18.0607 30.9393L3.06066 15.9393L0.939339 18.0607L15.9393 33.0607L18.0607 30.9393ZM3.06066 18.0607L18.0607 3.06066L15.9393 0.93934L0.939339 15.9393L3.06066 18.0607Z" fill="#F5BFAB" />
        </svg>
      </button>

      <div className="carousel__body">
        <div
          className="carousel__line"
          style={{ left: `${offset}px` }}
          ref={carouselLineRef}
        >
          {images?.map((item, index) => {
            return <img className="carousel__img" src={item.img} key={index} alt="Фото салона" />
          })}
          {isEdited ? <div className="carousel__add-img">
            <input src="" alt="Загрузка фото" type="file" />
          </div> : ""}
          {/* {isEdited ? <img className="carousel__img" src="" alt="Загрузка фото" /> : ""} */}
        </div>
      </div>


      <button
        className="carousel__btn-next"
        onClick={handleClickNext}
      >
        <svg width="19" height="34" viewBox="0 0 19 34" fill="none">
          <path d="M3.06066 0.939341C2.47487 0.353554 1.52513 0.353554 0.93934 0.939341C0.353553 1.52513 0.353553 2.47487 0.93934 3.06066L3.06066 0.939341ZM17 17L18.0607 18.0607C18.342 17.7794 18.5 17.3978 18.5 17C18.5 16.6022 18.342 16.2206 18.0607 15.9393L17 17ZM0.93934 30.9393C0.353553 31.5251 0.353553 32.4749 0.93934 33.0607C1.52513 33.6464 2.47487 33.6464 3.06066 33.0607L0.93934 30.9393ZM0.93934 3.06066L15.9393 18.0607L18.0607 15.9393L3.06066 0.939341L0.93934 3.06066ZM15.9393 15.9393L0.93934 30.9393L3.06066 33.0607L18.0607 18.0607L15.9393 15.9393Z" fill="#F5BFAB" />
        </svg>
      </button>
    </div>
  )
}

Carousel.propTypes = {
  images: propTypes.arrayOf(propTypes.object),
  isEdited: propTypes.bool
}

Carousel.defaultProps = {
  images: null,
  isEdited: false
}

export default React.memo(Carousel);