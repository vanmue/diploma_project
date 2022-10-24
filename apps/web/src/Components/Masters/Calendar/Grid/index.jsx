import React from 'react'
import './grid.scss'

const CalendarGrid = ({ startDay, today, cellClick }) => {

    //const totalDays = 42
    const day = startDay.clone().subtract(1, 'day')
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone())
    const color1 = (dayItem) => {
        if (dayItem.format('YYYYMMDD') === today.format('YYYYMMDD')) {
            return { padding: 6, color: "#F5BFAB", borderRadius: "50%", background: " #410935" }
        }
        else if (dayItem.day() === 6 && dayItem.format('YYYYMMDD') > today.format('YYYYMMDD')
            || dayItem.day() === 0 && dayItem.format('YYYYMMDD') > today.format('YYYYMMDD')) {
            return { color: "#A4011A" }
        } else if (dayItem.format('YYYYMMDD') > today.format('YYYYMMDD')) {
            return { color: "#410931" }
        }
    }

    return <div className='grid_wrapper' >
        {daysArray.map((dayItem) =>
            <div key={dayItem.format('YYYYMMMMDD')} className='cell_wrapper' onClick={cellClick}>
                <span className='date' style={color1(dayItem)} key={dayItem.format('DDMM')}>
                    {dayItem.format('D')}
                </span>
            </div>)
        }
    </div >
}
export { CalendarGrid }