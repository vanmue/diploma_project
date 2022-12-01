import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUserThunk } from '../../actions/userInfoActions'
import './user-office.scss'

import userFoto from './img/Ellipse.png'

function UserOffice() {

    const userInfo = useSelector(store => store.userInfoReducer)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserThunk(6))
    }, [])

    console.log(userInfo.dataUser.user)
    const gridColumns = ['Дата', 'Время', 'Салон', 'Мастер', 'Услуга', 'Стоимость']

    const gridInfoActual = [
        {
            date: '25.11.2022',
            time: '15:00',
            salon: 'Салон-красоты Версаль',
            master: 'Светлана Иванова',
            service: 'Стрижка женская (до 25 см)',
            price: 1000,
            rating: 'rating'
        },
        {
            date: '29.11.2022',
            time: '12:00',
            salon: 'Салон-красоты Лето',
            master: 'Мария Светлова',
            service: 'Маникюр со снятием и покрытием',
            price: 1500,
            rating: 'rating'
        },
    ]
    const gridInfoarchive = [
        {
            date: '10.10.2022',
            time: '11:00',
            salon: 'Салон-красоты Версаль',
            master: 'Светлана Иванова',
            service: 'Стрижка женская (до 25 см)',
            price: 1000,
            rating: 'rating'
        },
        {
            date: '15.10.2022',
            time: '18:00',
            salon: 'Салон-красоты Лето',
            master: 'Мария Светлова',
            service: 'Маникюр со снятием и покрытием',
            price: 1500,
            rating: 'rating'
        },
    ]
    const gridInfo = (item, index) => {
        return (
            <div key={item.date + index} className="user-record__grid">
                <div>{item.date}</div>
                <div>{item.time}</div>
                <div>{item.salon}</div>
                <div>{item.master}</div>
                <div>{item.service}</div>
                <div>{item.price} рублей</div>
                <div>{item.rating}<div style={{ textDecorationLine: 'underline' }}>написать отзыв</div></div>
            </div>
        )
    }

    return (
        <div className='main-page'>
            <div className="container">
                <div className="user-page">
                    <div className="user-info">
                        <img src={userFoto} alt="foto" />
                        <div className="user-info__block">
                            <h2>Мария Александрова</h2>
                            <p> <span style={{ marginRight: '36px' }}>Телефон: +7-920-123-45-67</span><span>Телефон: +7-920-123-45-67</span> </p>
                            <p style={{ textDecorationLine: 'underline' }}>Изменить данные</p>
                        </div>
                    </div>
                    <div className="user-info__record"></div>
                    <h2 style={{ marginTop: '45px', marginBottom: '45px' }}>Актуальные записи:</h2>
                    <div className="user-record__grid">
                        {gridColumns.map((column) => <span key={column}>{column}</span>
                        )}
                    </div>
                    {gridInfoActual.map((item, index) =>
                        gridInfo(item, index)
                    )}
                    <h2 style={{ marginTop: '45px', marginBottom: '45px' }} >Архивные записи:</h2>
                    <div className="user-record__grid">
                        {gridColumns.map((column) => <span key={column}>{column}</span>
                        )}
                    </div>
                    {gridInfoarchive.map((item, index) =>
                        gridInfo(item, index)
                    )}
                </div>
            </div>
        </div >
    )
}

export default UserOffice