import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getMasterIdActionThunk } from '../../actions/masterIdAction';
import { getMasterRecordMonthThunk } from '../../actions/masterRecordAction';
import { getMasterIdFromUserIdThunk } from '../../actions/masterIdFromUserIdActions'
import Rating from '../../Components/Rating';
import Calendar from '../../Components/Masters/Calendar';
import Price from '../../Components/Masters/Price'

function MasterOffice() {
    const token = localStorage.getItem("access_token");
    const masterRecordMonth = useSelector(store => store.masterRecordReducer.recordMonth);
    const entity_id = useSelector(store => store.masterIdFromUserIdReducer)
    const data = useSelector(store => store.masterIdReducer.dataMaster)

    let masterIdOfRoot = null
    if (JSON.parse(localStorage.getItem("profilId")) != null) {
        masterIdOfRoot = JSON.parse(localStorage.getItem("profilId"))?.masterId
    }
    let masterId

    if (masterIdOfRoot) {
        masterId = masterIdOfRoot
    } else if (entity_id.masterId) {
        masterId = entity_id.masterId[0].entity_id
    }
    console.log(masterId)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMasterIdFromUserIdThunk(token))
        dispatch(getMasterIdActionThunk(`${masterId}`));
        dispatch(getMasterRecordMonthThunk(masterId))
    }, [masterId])

    return (
        <div className='main-page'>
            <div className="container">
                <div className="master__item-block">
                    <div className="master__item-img">
                        <img src={data?.img_file.path} alt="foto" />
                    </div>
                    <div className="master__info-block">
                        <h2 className="master__name">{data?.profile.user.name} {data?.profile.user.surname} - {data?.profession}</h2>
                        <div className="master-card__wrapp-rating">
                            <Rating rating={data?.reviews_scores_avg} />
                        </div>
                        <p className="master__work">Работает в салоне: {data?.shops[0].name}<span style={{ marginLeft: '36px' }}>ваш id-{masterId}</span> </p>
                        <div className="master__info">
                            <p> {data?.description} </p>
                        </div>
                    </div>
                </div>
                <Calendar masterRecordMonth={masterRecordMonth} masterId={masterId} />
                <Price masterId={masterId} />
            </div>
        </div>
    )
}
export default MasterOffice