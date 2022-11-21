import React from 'react'
import PriceServices from './PriceServices'

function Price({ price }) {
    return <>
        <h2 className='calendar__text '>Стоимость услуг:</h2>
        <ul>
            <PriceServices price={price} />
        </ul>
    </>
}
export default Price