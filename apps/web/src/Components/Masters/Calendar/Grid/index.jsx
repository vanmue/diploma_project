import React from 'react'
import moment from 'moment'
import './grid.scss'

const CalendarGrid = ({ startDay, today, cellClick }) => {


    const day = startDay.clone().subtract(1, 'day')
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone())

    const colorDay = (dayItem) => {
        if (moment(dayItem.format('YYYYMMDD')).isSame(today.format('YYYYMMDD'))) {
            return { padding: 6, color: "#F5BFAB", borderRadius: "50%", background: " #410935" }
        }
        else if ((dayItem.day() === 6 && moment(dayItem.format('YYYYMMDD')).isAfter(today.format('YYYYMMDD')))
            || (dayItem.day() === 0 && moment(dayItem.format('YYYYMMDD')).isAfter(today.format('YYYYMMDD')))) {
            return { color: "#A4011A" }
        } else if (dayItem.format('YYYYMMDD') > today.format('YYYYMMDD')) {
            return { color: "#410931" }
        }
    }

    return <div className='grid_wrapper' >
        {daysArray.map((dayItem) =>
            <div key={dayItem.format('YYYYMMMMDD')} className='cell_wrapper' value={dayItem.format('YYYY-MM-DD')} onClick={(e) => cellClick(e)}>
                < div className='date' style={colorDay(dayItem)} key={dayItem.format('YYYYDDMM')}>
                    {dayItem.format('D')}
                </div>
            </div>)
        }
    </div >
}
export { CalendarGrid }