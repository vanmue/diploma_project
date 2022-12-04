import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUserThunk } from '../../actions/userInfoActions'
import { getUserRecordThunk } from '../../actions/userRecordActions'
import moment from 'moment'

import './user-office.scss'


function UserOffice() {
    const userId = 1
    const gridColumns = ['Дата', 'Время', 'Салон', 'Мастер', 'Услуга', 'Стоимость']
    const dispatch = useDispatch();
    const userInfo = useSelector(store => store.userInfoReducer.dataUser)
    const userRecord = useSelector(store => store.userRecordReducer)

    useEffect(() => {
        dispatch(getUserThunk(userId))
        dispatch(getUserRecordThunk(userId))
    }, [])

    const local = moment().local().toISOString();

    let gridInfoActual
    let gridInfoArchive

    if (userRecord.record) {
        const infoArchive = userRecord?.record.filter(record => moment(record.from).isSameOrBefore(local) === true)
        const infoActual = userRecord?.record.filter(record => moment(record.from).isAfter(local) === true)

        function add(item) {
            return {
                date: moment(item.from).format('DD.MM.YYYY'),
                time: moment(item.from).format('HH:mm'),
                salon: item.shop.name,
                master: item.master.profile.user.name,
                service: item.deliverable.name,
                price: item.deliverable.price,
                rating: 'rating'
            }
        }
        gridInfoActual = infoActual.map((item) => add(item))
        gridInfoArchive = infoArchive.map((item) => add(item))
    }


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
                        <img src={userInfo?.avatar.path} alt="foto" />
                        <div className="user-info__block">
                            <h2>{userInfo?.name} {userInfo?.surname}</h2>
                            <p> <span style={{ marginRight: '36px' }}>Телефон: {userInfo?.phone}</span></p>
                            <p style={{ textDecorationLine: 'underline' }}>Изменить данные</p>
                        </div>
                    </div>
                    <div className="user-info__record"></div>
                    <h2 style={{ marginTop: '45px', marginBottom: '45px' }}>Актуальные записи:</h2>
                    <div className="user-record__grid">
                        {gridColumns.map((column) => <span key={column}>{column}</span>
                        )}
                    </div>
                    {gridInfoActual?.map((item, index) =>
                        gridInfo(item, index)
                    )}
                    <h2 style={{ marginTop: '45px', marginBottom: '45px' }} >Архивные записи:</h2>
                    <div className="user-record__grid">
                        {gridColumns.map((column) => <span key={column}>{column}</span>
                        )}
                    </div>
                    {gridInfoArchive?.map((item, index) =>
                        gridInfo(item, index)
                    )}
                </div>
            </div>
        </div >
    )
}

export default UserOffice