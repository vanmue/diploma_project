import React from 'react'
import moment from 'moment'
import { CalendarGrid } from './Grid'
import { CalendarMonth } from './CalendarMonth'
import './calendar.scss'
import { useState } from 'react'
import ModalWindow from "./ModalWindow/index.jsx";




function Calendar({ dataMaster, salonId }) {

    const data = [dataMaster?.deliverables]
    moment.updateLocale('es', { week: { dow: 1 } })
    moment.updateLocale('es', {
        months: [
            "январь", "февраль", "март", "апрель", "май", "июнь", "июль",
            "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
        ]
    })

    const today = moment()
    const [itemday, setItemDay] = useState(today.clone())
    const [modalActive, setModalActive] = useState(false);
    const [choiceDay, setChoiceDay] = useState('')
    const [day, setDay] = useState('');

    function changeModalActive() {
        setModalActive(false)
    }


    function cellClick(e) {
        e.stopPropagation()
        getDay(e.target.attributes.value.nodeValue)
        if (moment(moment(e.target.attributes.value.nodeValue)).isSameOrAfter(today.format('YYYY-MM-DD'))) {
            setChoiceDay(moment(e.target.attributes.value.nodeValue).toISOString())
            setModalActive(true)
        }
    }
    function modalClose() {
        setModalActive(false)
    }

    function getDay(day1) {
        setDay(day1)
    }


    const startDay = itemday.clone().startOf('month').startOf('week')

    function monthSubtract() {
        setItemDay(itemday.clone().subtract(1, 'M'))
    }

    function monthAdd() {
        setItemDay(itemday.clone().add(1, 'M'))
    }

    return (
        <div onClick={modalClose}>
            <h2 className='calendar__text'>Выбрать дату и время для записи:</h2>
            <CalendarMonth itemday={itemday} monthSubtract={monthSubtract} monthAdd={monthAdd} />
            <CalendarGrid startDay={startDay} today={today} cellClick={cellClick} getDay={getDay} />
            {modalActive
                ? <ModalWindow
                    modalActive={modalActive}
                    choiceDay={choiceDay}
                    data={data}
                    dataMaster={dataMaster}
                    changeModalActive={changeModalActive}
                    salonId={salonId} />
                : null}

        </div>
    );
}

export default Calendar;