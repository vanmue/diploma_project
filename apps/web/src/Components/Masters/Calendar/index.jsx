import React from 'react'
import moment from 'moment'
import { CalendarGrid } from './Grid'
import { CalendarMonth } from './CalendarMonth'
import './calendar.scss'
import { useState, useEffect } from 'react'
import ModalWindow from "./ModalWindow/index.jsx";




function Calendar({ dataMaster, record }) {
    //console.log(dataMaster)
    //console.log(dataMaster?.deliverable_groups.map(item => item.name))

    //const [data, setData] = useState([]);
    const servise = []
    dataMaster?.deliverable_groups.map(item => servise.push(item.name))


    //console.log(servise)

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

    function cellClick(e) {
        e.stopPropagation()
        if (moment(moment(e.target.attributes.value.nodeValue)).isSameOrAfter(today.format('YYYY-MM-DD'))) {
            setChoiceDay(moment(e.target.attributes.value.nodeValue).format('D MMMM'))
            setModalActive(true)
        }

    }
    function modalClose() {
        setModalActive(false)
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
            <CalendarGrid startDay={startDay} today={today} cellClick={cellClick} />
            <ModalWindow modalActive={modalActive} choiceDay={choiceDay} data={servise} dataMaster={dataMaster} />
        </div>
    );
}

export default Calendar;