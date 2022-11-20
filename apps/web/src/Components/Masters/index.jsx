import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GET_MASTER } from "../../actions/masterRecordAction";
import Calendar from './Calendar'
import Price from './Price'
import Reviews from "./Reviews";
import "./master.scss"
import Rating from '../Rating'


function Master() {
    const [data, setData] = useState({
        id: '',
        profession: '',
        description: '',
        score: '',
        img: '',
        user: {
            id: '',
            name: '',
            surname: ''
        },
        shops: [{
            name: ''
        }],
        reviews_count: '',
        deliverable_groups: ''
    });
    const masterId = useSelector(store => store.masterIdReducer);
    useEffect(() => {
        fetch('/api/v1/masters')
            .then((res) => res.json())
            .then((res) => {
                setData(res.data.filter(master => master.user.id === masterId.id)[0])
            })
            .catch(error => console.log(error))
    }, [])

    console.log(data)
    return <>
        <div className='main-page'>
            <div className="container">
                <div className="master__item-block">
                    <div className="master__item-img">
                        <img src={data.img} alt="foto" />
                    </div>
                    <div className="master__info-block">
                        <h2 className="master__name">{data.user.name} {data.user.surname} - {data.profession}</h2>
                        <div className="master-card__wrapp-rating">
                            <Rating />
                        </div>

                        <p className="master__work">Работает в салоне: {data.shops[0].name}</p>
                        <div className="master__info">
                            <p> {data.description} </p>
                        </div>
                    </div>
                </div>
                <Calendar dataUser={data} />
                <Price />
                <Reviews />
            </div>
        </div>

    </>
}

export default Master