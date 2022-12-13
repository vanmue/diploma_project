import React from 'react'
import PriceServices from './PriceServices'

function Price({ masterId }) {
    return <>
        <h2 className='calendar__text '>Стоимость услуг:</h2>
        <ul>
            <PriceServices masterId={masterId} />
        </ul>
    </>
}
export default Price