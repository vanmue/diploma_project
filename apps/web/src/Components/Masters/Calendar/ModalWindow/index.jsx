import React from "react";
import { useState } from 'react';
import DropdownModal from './dropdownModal'
import './modalWindow.scss'

function ModalWindow({ modalActive, choiceDay, data, dataMaster }) {
    const cell = ['10-00', '11-00', '12-00', '13-00', '14-00', '15-00', '16-00', '17-00', '18-00']

    const [tel, setTel] = useState('');
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [time, setTime] = useState('');
    const [choose, setChoose] = useState(true)
    const [choice, setChoice] = useState(null)

    const servise = Object.values(data)

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
        console.log(choice)
        console.log(time)
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        console.log(e.target[2].value)
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
                            items={servise}
                            setChoice={setChoice}
                        />
                        <div className="modal__master-time">
                            <h2>Время доступное для записи</h2>
                            <p>{choiceDay}</p>
                            <div className="modal__master-grid">
                                {cell.map((time) =>
                                    <span
                                        style={{ color: '#410935' }}
                                        key={time} className="modal__master-cell"
                                        onClick={(e) => chooseTime(e)}>{time}</span>
                                )}

                            </div>
                        </div>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
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