import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Calendar from './Calendar'
import Price from './Price'
import Reviews from "./Reviews";
import "./master.scss"
import Rating from '../Rating'
import { getMasterIdActionThunk } from '../../actions/masterIdAction'
import { getMasterRecordThunk } from '../../actions/masterRecordAction'

function Master() {
  const masterRecord = useSelector(store => store.masterRecordReducer);
  const masterId = useSelector(store => store.masterIdReducer.salon);
  const data = useSelector(store => store.masterIdReducer);

  const [record, setRecord] = useState(null)
  const [day, setDay] = useState('')

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMasterIdActionThunk(masterId))
  }, [masterId])



  console.log(data)

  function getDay(day1) {
    setDay(day1)
  }
  // useEffect(() => {

  //   fetch(`/api/v1/masters/${masterId}/shops/${shopID}/appointments/?date=${day}`)
  //     .then((req) => req.json())
  //     .then((res) => {
  //       if (res.data[0]) {
  //         console.log(res.data[0].shops[0].appointments)
  //         //console.log(res.data?.filter(master => master.id === masterId)[0])
  //         setRecord(res.data[0])
  //       }
  //     })
  //     .catch(error => console.log(error))

  // }, [day])

  // useEffect(() => {
  //   setRecord(dispatch(getMasterIdActionThunk(`date=${day}&master_id=${masterId}`)))
  // }, [day])
  //console.log(record)

  //console.log(day)

  return <>
    <div className='main-page'>
      <div className="container">
        <div className="master__item-block">
          <div className="master__item-img">
            <img src={data?.img_file.path} alt="foto" />
          </div>
          <div className="master__info-block">
            <h2 className="master__name">{data?.user.name} {data?.user.surname} - {data?.profession}</h2>
            <div className="master-card__wrapp-rating">
              <Rating />
            </div>

            <p className="master__work">Работает в салоне: {data?.shops[0].name}</p>
            <div className="master__info">
              <p> {data?.description} </p>
            </div>
          </div>
        </div>
        <Calendar dataMaster={data} record={record} getDay={getDay} />
        <Price price={record} />
        <Reviews record={record} />
      </div>
    </div>

  </>
}

export default React.memo(Master);