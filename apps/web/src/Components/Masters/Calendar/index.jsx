import React, { useEffect } from 'react'
import moment from 'moment'
import { CalendarGrid } from './Grid'
import { CalendarMonth } from './CalendarMonth'
import './calendar.scss'
import { useState } from 'react'
import ModalWindow from "./ModalWindow/index.jsx";
import ModalWindowMasterRecord from "./ModalWindowMasterRecord/index"
import { getMasterIdActionThunk } from '../../../actions/masterIdAction'
import { useDispatch, useSelector } from 'react-redux';
import { isActiveSignInModalAction } from '../../../actions/authorizationActions'




function Calendar({ dataMaster, salonId, masterRecordMonth, masterId }) {

    const activeSignInModal = useSelector(state => state.authorizationReducer.isActiveSignInModal)

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
    const [modalActiveMasterRecord, setModalActiveMasterRecord] = useState(false);
    const [choiceDay, setChoiceDay] = useState('')
    const [day, setDay] = useState('');

    const masterRecord = useSelector(store => store.masterIdReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMasterIdActionThunk(`${masterId}`))
    }, [])

    let weekend = []

    if (weekend) {
        weekend = masterRecord.dataMaster?.weekends.map((item => {
            if (item.weekday === 7) { item.weekday = 0 }
            return item.weekday
        }))
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

    function changeModalActive() {
        setModalActive(false)
    }

    function cellClick(e) {
        if (e.target.children[0].className === 'color-red date') {
            return
        };
        if (JSON.parse(localStorage.getItem("userStructure")) === null) {
            dispatch(isActiveSignInModalAction(true))
            return
        }

        e.stopPropagation()
        getDay(e.target.attributes.value.nodeValue)
        setChoiceDay(moment(e.target.attributes.value.nodeValue).toISOString())

        if (dataMaster) {
            if (moment(moment(e.target.attributes.value.nodeValue)).isSameOrAfter(today.format('YYYY-MM-DD'))) {
                setModalActive(true)
            }
        }
        if (masterRecordMonth) {
            if (moment(moment(e.target.attributes.value.nodeValue)).isSameOrAfter(today.format('YYYY-MM-DD'))) {
                setModalActiveMasterRecord(true)
            }
        }
    }
    function modalClose() {
        setModalActive(false)
        setModalActiveMasterRecord(false)
    }

    return (
        <div onClick={modalClose}>
            <h2 className='calendar__text'>Выбрать дату и время для записи:</h2>
            <CalendarMonth itemday={itemday} monthSubtract={monthSubtract} monthAdd={monthAdd} />
            <CalendarGrid startDay={startDay} today={today} cellClick={cellClick} getDay={getDay} masterRecordMonth={masterRecordMonth} weekend={weekend} />
            {modalActive
                ? <ModalWindow
                    modalActive={modalActive}
                    choiceDay={choiceDay}
                    data={data}
                    dataMaster={dataMaster}
                    changeModalActive={changeModalActive}
                    salonId={salonId} />
                : null}
            {modalActiveMasterRecord
                ? <ModalWindowMasterRecord choiceDay={choiceDay} masterId={masterId} />
                : null}
        </div>
    );
}

export default React.memo(Calendar);