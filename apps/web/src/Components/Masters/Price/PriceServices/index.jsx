import React from 'react'
import './priceServices.scss'



function PriceServices({ price }) {
    //console.log(price?.deliverables)
    return <div>{
        price?.deliverables.map((item) =>
            <li key={item.name} className='price__link'><span>{item.name}</span><span>{item.price}</span></li>
        )
    }

    </div>
}
export default PriceServices;