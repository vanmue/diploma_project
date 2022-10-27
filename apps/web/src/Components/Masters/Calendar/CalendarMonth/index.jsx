import React from 'react'
import './calendarMonth.scss'


const CalendarMonth = ({ itemday, monthSubtract, monthAdd }) => {
    return <div className='calendar-month'>
        <span className='calendar__arrow' onClick={monthSubtract}>&lt; </span> {itemday.format('MMMM')} <span onClick={monthAdd} className='calendar__arrow'> &gt;</span>

    </div>
}
export { CalendarMonth }