import React from 'react'
import './priceServices.scss'

const priceServices = [{
    service: 'Окрашивание на короткие волосы (до 25 см)',
    price: 'от 2000 руб.'
},
{
    service: 'Окрашивание на длинные волосы (от 25 см)',
    price: 'от 5000 руб.'
},
{
    service: 'Стрижка женская (до 25 см)',
    price: '1000 руб'
},
{
    service: 'Стрижка женская (от 25 см)',
    price: 'от 1500 руб.'
},
{
    service: 'Стрижка мужская',
    price: ' 500 руб.'
}
]

function PriceServices() {
    return <div>{
        priceServices.map((item) =>
            <li key={item.service} className='price__link'><span>{item.service}</span><span>{item.price}</span></li>
        )
    }

    </div>
}
export default PriceServices;