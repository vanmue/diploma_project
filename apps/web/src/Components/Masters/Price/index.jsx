import React from 'react'
import PriceServices from './PriceServices'

function Price() {
    return <>
        <h2 className='calendar__text '>Стоимость услуг:</h2>
        <ul>
            <PriceServices />
        </ul>
    </>
}
export default Price