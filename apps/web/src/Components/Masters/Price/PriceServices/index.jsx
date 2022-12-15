import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getMasterIdActionCardThunk } from '../../../../actions/masterIdAction';
import './priceServices.scss'



function PriceServices({ masterId }) {
    const price = useSelector(store => store.masterIdReducer.dataMasterCard)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMasterIdActionCardThunk(`${masterId}`))
    }, [masterId])
    return <div>{
        price?.deliverables.map((item) =>
            <li key={item.name} className='price__link'><span>{item.name}</span><span>{item.price}</span></li>
        )
    }
    </div>
}
export default PriceServices;