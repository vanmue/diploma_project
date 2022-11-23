import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GET_MASTER } from "../../actions/masterIdAction";
import Calendar from './Calendar'
import Price from './Price'
import Reviews from "./Reviews";
import "./master.scss"
import Rating from '../Rating'

function Master() {
  const masterRecord = useSelector(store => store.masterRecoredReducer);
  const masterId = useSelector(store => store.masterIdReducer);

  const [data, setData] = useState(null);
  const [record, setRecord] = useState(masterRecord)
  const [price, setPrise] = useState(null)
  const [day, setDay] = useState('2022-11-17')

  function getDay(day1) {
    setDay(day1)
  }

  useEffect(() => {
    fetch('/api/v1/deliverables')
      .then((req) => req.json())
      .then((res) => {
        setPrise(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    fetch(`/api/v1/appointments/?date=${day}&master_id=${masterId.id}`)
      .then((req) => req.json())
      .then((res) => {
        setRecord(res.data?.filter(master => master.id === masterId.id)[0])
      })
      .catch(error => console.log(error))
  }, [day])

  useEffect(() => {
    fetch('/api/v1/masters')
      .then((req) => req.json())
      .then((res) => {
        setData(res.data?.filter(master => master.id === masterId.id)[0])
      })
      .catch(error => console.log(error))
  }, [])
  return <>
    <div className='main-page'>
      <div className="container">
        <div className="master__item-block">
          <div className="master__item-img">
            <img src={data?.img} alt="foto" />
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
        <Price price={price} />
        <Reviews />
      </div>
    </div>

  </>
}

export default React.memo(Master);