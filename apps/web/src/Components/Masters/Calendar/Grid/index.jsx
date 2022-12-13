import React from 'react'
import moment from 'moment'
import './grid.scss'

const CalendarGrid = ({ startDay, today, cellClick, masterRecordMonth, weekend }) => {

    let colorDay = () => { return null }



    const recordDay = (dayItem) => {
        let recordScore = 0
        masterRecordMonth?.map((item) => {
            if (moment(moment(item.from).format('YYYYMMDD')).isSame(dayItem.format('YYYYMMDD')) &&
                moment(moment(item.from).format('YYYYMMDD')).isSameOrAfter(today.format('YYYYMMDD'))) {
                recordScore++
            }

            return recordScore
        })
        return (<>
            {recordScore != 0 ? <> <p className='record-count_text'>записи:</p><br /><p className='record-count'>{recordScore}</p></> : null}
        </>
        )
    }

    const day = startDay.clone().subtract(1, 'day')
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone())

    if (weekend) {
        colorDay = (dayItem) => {
            if (moment(dayItem.format('YYYYMMDD')).isSame(today.format('YYYYMMDD'))) {
                return 'today date'
            }
            else if ((dayItem.day() === weekend[0] && moment(dayItem.format('YYYYMMDD')).isAfter(today.format('YYYYMMDD')))
                || (dayItem.day() === weekend[1] && moment(dayItem.format('YYYYMMDD')).isAfter(today.format('YYYYMMDD')))) {
                return 'color-red date'
            } else if (dayItem.format('YYYYMMDD') > today.format('YYYYMMDD')) {
                return 'color-black date'
            } else { return 'date' }
        }
    }
    return <div className='grid_wrapper' >
        {daysArray.map((dayItem) =>
            <div
                key={dayItem.format('YYYYMMMMDD')}
                className='cell_wrapper'
                value={dayItem.format('YYYY-MM-DD')}
                onClick={(e) => cellClick(e)}>
                < div className={colorDay(dayItem)} key={dayItem.format('YYYYDDMM')}>
                    {dayItem.format('D')}
                </div>
                {masterRecordMonth ? recordDay(dayItem) : null}
            </div>)
        }
    </div >
}
export { CalendarGrid }