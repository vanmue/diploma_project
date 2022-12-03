import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getMasterIdActionThunk } from '../../actions/masterIdAction';
import Rating from '../../Components/Rating';
import Calendar from '../../Components/Masters/Calendar';
import Price from '../../Components/Masters/Price'

function MasterOffice() {

    const masterRecord = useSelector(store => store.masterRecoredReducer);
    const masterId = useSelector(store => store.masterIdReducer.id);
    const data = useSelector(store => store.masterIdReducer.dataMaster)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMasterIdActionThunk(`master_id=${masterId}`))
    }, [])

    return (
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
                <Calendar />
                <Price />
            </div>
        </div>
    )
}
export default MasterOffice