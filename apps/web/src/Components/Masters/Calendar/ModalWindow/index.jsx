import React from "react";
import { useState } from 'react';
import DropdownModal from './dropdownModal'
import moment from 'moment'
import './modalWindow.scss'

function ModalWindow({ modalActive, choiceDay, data, dataMaster, record }) {
    let cell = ['10-00', '11-00', '12-00', '13-00', '14-00', '15-00', '16-00', '17-00', '18-00']

    const [tel, setTel] = useState('');
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [time, setTime] = useState(null);
    const [choose, setChoose] = useState(true)
    const [choice, setChoice] = useState({})
    const [form, setForm] = useState(null)

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
        console.log(e)
        e.preventDefault()
        if (choice === null) {
            alert('выбирите услугу')
        } else if (!time) {
            alert('выбирите время')
        } else if (!name) {
            alert('напишите имя ')
        } else if (!tel) {
            alert('напишите телефон ')
        }

        setForm({
            masterId: dataMaster.id,
            shopId: dataMaster.shops[0].id,
            deliverableId: choice?.id,
            comments: e.target[2].value,
            from: moment(choiceDay).add(time.slice(0, -3), 'hours').toISOString(),
            name: e.target[0].value,
            phone: e.target[1].value,
            to: moment(choiceDay).add((time.slice(0, -3) + 1), 'hours').toISOString(),
        })
    }

    if (form) {
        fetch(`/api/v1/appointments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }

    if (record?.shops[0].appointments) {
        cell = cell.filter(time =>
            record?.shops[0].appointments.map(rec => moment(rec.from).format('HH-mm')).indexOf(time) === -1
        )
    }

    return <>
        <div className="fixed-overlay" style={{ display: modalActive ? "block" : "none" }}>
            <div onClick={(e) => e.stopPropagation()} className="modal">
                <div className="modal_container">
                    <div className="modal__master-block">
                        <div className="modal__master-foto">
                            <img src={dataMaster?.user.avatar} alt="" />
                        </div>
                        <div className="modal__master-text">
                            <h2 className="modal__master-name">{dataMaster?.user.name}</h2>
                            <p className="modal__master-specialization">{dataMaster?.profession}</p>
                            <p>рейтинг</p>
                        </div>
                    </div>
                    <div className="modal__master-choice">
                        <DropdownModal
                            dropdownTitle={'Выберите услугу'}
                            items={data}
                            setChoice={setChoice}
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
                                <label  >Имя:</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div>
                                <label >Телефон:</label>
                                <input type="tel" value={tel} onChange={e => setTel(e.target.value)} />
                            </div>
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
export default ModalWindow