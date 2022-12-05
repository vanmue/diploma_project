import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Calendar from './Calendar'
import Price from './Price'
import Reviews from "./Reviews";
import "./master.scss"
import Rating from '../Rating'
import { getMasterIdActionThunk } from '../../actions/masterIdAction'
import { getAciveSalonByIdThunk } from '../../actions/salonsAction'

function Master() {
  let masterId = useSelector(store => store.masterIdReducer.id);
  let salonId = useSelector(store => store.masterIdReducer.salonId);
  const data = useSelector(store => store.masterIdReducer.dataMaster);
  const salon = useSelector(store => store.salonsReducer.activeSalon);
  const arrReting = []

  console.log(data)
  const ret = () => {
    data?.reviews.map(review => {
      if (review.score) {
        arrReting.push(review.score)
      }
    })
    return arrReting.reduce((a, b) => a + b, 0) / arrReting.length
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMasterIdActionThunk(masterId));
    dispatch(getAciveSalonByIdThunk(salonId));
  }, [])

  if (masterId && salonId) {
    localStorage.setItem("masterId&salonId", JSON.stringify({ masterId: masterId, salonId: salonId }))
  }
  masterId = JSON.parse(localStorage.getItem("masterId&salonId")).masterId
  salonId = JSON.parse(localStorage.getItem("masterId&salonId")).salonId

  return <>
    <div className='main-page'>
      <div className="container">
        <div className="master__item-block">
          <div className="master__item-img">
            <img src={data?.img_file.path} alt="foto" />
          </div>
          <div className="master__info-block">
            <h2 className="master__name">{data?.profile.user.name} {data?.profile.user.surname} - {data?.profession}</h2>
            <div className="master-card__wrapp-rating">
              <Rating rating={ret()} />
            </div>

            <p className="master__work">Работает в салоне: {salon?.name}</p>
            <div className="master__info">
              <p> {data?.description} </p>
            </div>
          </div>
        </div>
        <Calendar dataMaster={data} salonId={salonId} />
        <Price price={data?.deliverables} />
        <Reviews reviews={data?.reviews} />
      </div>
    </div>

  </>
}

export default React.memo(Master);