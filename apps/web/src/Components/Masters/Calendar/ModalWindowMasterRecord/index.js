import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import moment from 'moment'
import { getMasterRecordThunk } from '../../../../actions/masterRecordAction'
import './modalWindowMasterRecord.scss'

function ModalWindowMasterRecord({ choiceDay, masterId }) {
    const masterRecord = useSelector(store => store.masterRecordReducer);
    const dispatch = useDispatch();



    const columnName = ['Время', 'Имя', 'Телефон', 'Услуга', 'Стоимость', 'Коментарий']

    useEffect(() => {
        dispatch(getMasterRecordThunk(masterId, moment(choiceDay).format('YYYY-MM-DD')))
    }, [choiceDay])

    const recordInfo = (record) => {
        return (
            <div key={record?.id} className="list__grid-wrapper" >
                <div><span className="list__grid-wrapper-time">{moment(record?.from).format('HH-mm')}</span></div>
                <div><span>{record.profile.user.name + record.profile.user.surname}</span></div>
                <div>{record.profile.user.phone}</div>
                <div>{record.deliverable.name}</div>
                <div>{record.deliverable.price} рублей</div>
                <div>{record.comments}</div>
            </div>
        )
    }

    return <>
        <div className="fixed-overlay__record" /* style={{ display: modalActive ? "block" : "none" }} */>
            <div onClick={(e) => e.stopPropagation()} className="modal" style={{ width: '900px' }}>
                <div className="modal_container">
                    <p className="modal_container-date">{moment(choiceDay).format('D MMMM')}</p>
                    <p className="modal_container-list">Список записей:</p>
                    <div className="list__grid-wrapper">
                        {columnName.map(item => <span key={item} >{item}</span>)}
                    </div>

                    {masterRecord.record?.map(record => recordInfo(record))}


                </div>
            </div>
        </div>
    </>
}

export default React.memo(ModalWindowMasterRecord)