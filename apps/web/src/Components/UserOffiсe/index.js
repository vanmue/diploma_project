import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUserThunk, setUserThunk } from '../../actions/userInfoActions';
import { getUserRecordThunk } from '../../actions/userRecordActions';
import { deleteUserRecordThunk } from '../../actions/userRecordActions';
import moment from 'moment';
import Rating from '../Rating';
import ModalUserOffice from "./modalUserOffice/modalUserOffice";
import ModalChangeUserInfo from "./modalChangeUserInfo/index";
import { useLocation } from 'react-router-dom';

import './user-office.scss';


function UserOffice() {
    let userId = null


    const gridColumns = ['Дата', 'Время', 'Салон', 'Мастер', 'Услуга', 'Стоимость']
    const dispatch = useDispatch();
    const userInfo = useSelector(store => store.userInfoReducer.dataUser)
    const userRecord = useSelector(store => store.userRecordReducer)

    let userIdOfRoot = null

    if (localStorage.getItem("profilId")) {
        userIdOfRoot = JSON.parse(localStorage.getItem("profilId"))?.userId
    }

    if (userIdOfRoot) {
        userId = userIdOfRoot
    } else {
        userId = JSON.parse(localStorage.getItem("userStructure")).id
    }


    const [activeChange, setActiveChange] = useState(false)
    const [active, setActive] = useState(false)
    const [appointmentId, setAppointmentId] = useState()


    useEffect(() => {
        dispatch(getUserThunk(userId))
        dispatch(getUserRecordThunk(userId))
    }, [activeChange])

    const local = moment().local().toISOString();

    function toChangeUser(form) {
        if (form.id) {
            console.log(form)
            dispatch(setUserThunk(form))
        }
        setActiveChange(!activeChange)
    }

    function clickReview(e) {
        e.stopPropagation()
        setAppointmentId(e.target.id)
        setActive(true)
    }

    function changeModal() {
        setActive(false)
    }

    function deleteRecord(appointmentId) {

        console.log(appointmentId)
        dispatch(getUserRecordThunk(userId))
        fetch(`/api/v1/appointments/${appointmentId}`, { method: 'DELETE' })
            .then(req => req.json())
            .then(res => {
                console.log('del');
            })
    }

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
                rating: 'rating',
                appointmentId: item.id
            }
        }
        gridInfoActual = infoActual.map((item) => add(item))
        gridInfoArchive = infoArchive.map((item) => add(item))
    }


    const gridInfo = (item, active) => {
        return (
            <div key={item.appointmentId} className="user-record__grid">
                <div>{item.date}</div>
                <div>{item.time}</div>
                <div>{item.salon}</div>
                <div>{item.master}</div>
                <div>{item.service}</div>
                <div>{item.price} рублей</div>
                {active
                    ?
                    <div>
                        <Rating isAcive={true} />
                        <div id={item.appointmentId} style={{ textDecorationLine: 'underline' }} onClick={(e) => clickReview(e)} >написать отзыв</div>

                    </div>
                    : <span onClick={(e) => deleteRecord(item.appointmentId)}>отменить запись</span>}

            </div>
        )
    }


    return (
        <div onClick={changeModal} className='main-page'>
            <div className="container">
                <div className="user-page">
                    <div className="user-info">
                        <img src={userInfo?.avatar.path} alt="foto" />
                        <div className="user-info__block">
                            <h2>{userInfo?.name} {userInfo?.surname} </h2>
                            <p> <span style={{ marginRight: '36px' }}>Телефон: {userInfo?.phone}</span>
                                <span style={{ marginRight: '36px' }}>Mail: {userInfo?.email}</span>
                                <span style={{ marginLeft: '36px' }}>ваш id-{userId}</span> </p>
                            <p style={{ textDecorationLine: 'underline' }} onClick={toChangeUser}>Изменить данные</p>
                        </div>
                    </div>
                    <div className="user-info__record"></div>
                    <h2 style={{ marginTop: '45px', marginBottom: '45px' }}>Актуальные записи:</h2>
                    <div className="user-record__grid">
                        {gridColumns.map((column) => <span key={column}>{column}</span>
                        )}
                    </div>
                    {gridInfoActual?.map((item) =>
                        gridInfo(item, false)
                    )}
                    <h2 style={{ marginTop: '45px', marginBottom: '45px' }} >Архивные записи:</h2>
                    <div className="user-record__grid">
                        {gridColumns.map((column) => <span key={column}>{column}</span>
                        )}
                    </div>
                    {gridInfoArchive?.map((item) =>
                        gridInfo(item, true)
                    )}
                </div>
                {active ? <ModalUserOffice changeModal={changeModal} appointmentId={appointmentId} userId={userId} /> : null}
                {activeChange ? <ModalChangeUserInfo userInfo={userInfo} toChangeUser={toChangeUser} /> : null}
            </div>
        </div >
    )
}

export default UserOffice