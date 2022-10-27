import React from "react";
import './rating.scss'

function Rating() {

  const renderPicStar = () => {
    return <svg className="rating__pic-star" width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 0L9.18386 5.18237H14.6329L10.2245 8.38525L11.9084 13.5676L7.5 10.3647L3.09161 13.5676L4.77547 8.38525L0.367076 5.18237H5.81614L7.5 0Z" fill="white" />
    </svg>
  }

  return (
    <div className="rating">
      <div className="rating__body">
        {renderPicStar()}
        {renderPicStar()}
        {renderPicStar()}
        {renderPicStar()}
        {renderPicStar()}
        <div className="rating__active"></div>
        <div className="rating__items">
          <input className="rating__item" type="radio" name="rating" value={1} />
          <input className="rating__item" type="radio" name="rating" value={2} />
          <input className="rating__item" type="radio" name="rating" value={3} />
          <input className="rating__item" type="radio" name="rating" value={4} />
          <input className="rating__item" type="radio" name="rating" value={5} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Rating);