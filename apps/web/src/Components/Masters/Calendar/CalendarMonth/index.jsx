import React from 'react'
import './calendarMonth.scss'

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',

];
const CalendarMonth = ({ itemday, monthSubtract, monthAdd }) => {


    return <div className='calendar-month'>
        <span className='calendar__arrow' onClick={monthSubtract}>&lt; </span> {months[itemday.format('MM') - 1]} <span onClick={monthAdd} className='calendar__arrow'> &gt;</span>

    </div>
}
export { CalendarMonth }