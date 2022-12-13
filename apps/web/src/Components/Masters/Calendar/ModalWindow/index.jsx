import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import DropdownModal from './dropdownModal'
import moment from 'moment'
import './modalWindow.scss'
import { getMasterRecordThunk } from '../../../../actions/masterRecordAction'

function ModalWindow({ modalActive, choiceDay, data, dataMaster, changeModalActive, salonId }) {
    const masterRecord = useSelector(store => store.masterRecordReducer);

    let cell = ['10-00', '11-00', '12-00', '13-00', '14-00', '15-00', '16-00', '17-00', '18-00']


    const [text, setText] = useState('');
    const [time, setTime] = useState(null);
    const [choose, setChoose] = useState(true);
    const [choiceService, setChoiceService] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMasterRecordThunk(dataMaster?.id, moment(choiceDay).format('YYYY-MM-DD')))
    }, [choiceDay, dataMaster?.id])

    function chooseTime(e) {

        if (choose) {
            e.target.attributes[1].nodeValue = "background: rgb(65, 9, 53); color: rgb(255, 255, 255);"
            setTime(e.target.outerText)
        } else {
            alert('время уже выбрано')
        }
        setChoose(false)
    }


    function handleSubmit(e) {
        e.preventDefault()
        changeModalActive()
        if (choiceService === null) {
            alert('выбирите услугу')
        } else if (!time) {
            alert('выбирите время')
        } else {
            fetch(`/api/v1/appointments`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    masterId: dataMaster.id,
                    shopId: +salonId,
                    deliverableId: +choiceService?.id,
                    comments: e.target[0].value ? e.target[0].value : null,
                    from: moment(choiceDay).add(time.slice(0, -3), 'hours').toISOString(),
                    userId: 1,
                    to: moment(choiceDay).add((time.slice(0, -3) + 1), 'hours').toISOString()
                })
            })
                .then(res => res.json())
                .then(res => console.log(res))
        }
    }

    if (masterRecord?.record) {
        cell = cell.filter(time =>
            masterRecord?.record.map(rec => moment(rec.from).format('HH-mm')).indexOf(time) === -1
        )
    }
    return <>
        <div className="fixed-overlay" style={{ display: modalActive ? "block" : "none" }}>
            <div onClick={(e) => e.stopPropagation()} className="modal">
                <div className="modal_container">
                    <div className="modal__master-block">
                        <div className="modal__master-foto">
                            <img src={dataMaster?.profile.user.avatar.path} alt="" />
                        </div>
                        <div className="modal__master-text">
                            <h2 className="modal__master-name">{dataMaster?.profile.user.name} {dataMaster?.profile.user.surname}</h2>
                            <p className="modal__master-specialization">{dataMaster?.profession}</p>
                            <p>рейтинг</p>
                        </div>
                    </div>
                    <div className="modal__master-choice">
                        <DropdownModal
                            dropdownTitle={'Выберите услугу'}
                            items={data}
                            setChoiceService={setChoiceService}
                        />
                        <div className="modal__master-time">
                            <h2>Время доступное для записи</h2>
                            <p>{moment(choiceDay).format('D MMMM')}</p>
                            <div className="modal__master-grid">
                                {cell.map((ime) =>
                                    < span
                                        style={{ color: '#410935' }}
                                        key={ime} className="modal__master-cell"
                                        onClick={(e) => chooseTime(e)}>{ime}
                                    </span>
                                )}

                            </div>
                        </div>
                    </div>
                    <form onSubmit={e => handleSubmit(e)} >
                        <div className="modal__form">
                            <div >
                                <label  >Комментарий к записи:</label>
                                <input type="text" value={text} onChange={e => setText(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal__btn-wrap">
                            <button type="submit" className="modal__btn">Записаться</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
export default React.memo(ModalWindow)