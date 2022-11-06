import React from "react";
import { useState } from 'react';
import DropdownModal from './dropdownModal'
import './modalWindow.scss'
import image from '../../img/fotoMasters.png'

function ModalWindow({ modalActive, choiceDay }) {
    const cell = ['10-00', '11-00', '12-00', '13-00', '14-00', '15-00', '16-00', '17-00', '18-00']

    const servise = ['Стрижка на короткие волосы', 'Стрижка на длинные волосы', 'Окрашивание', 'Укладка волос']
    return <>
        <div className="fixed-overlay" style={{ display: modalActive ? "block" : "none" }}>
            <div onClick={(e) => e.stopPropagation()} className="modal">
                <div className="modal_container">
                    <div className="modal__master-block">
                        <div className="modal__master-foto">
                            <img src={image} alt="" />
                        </div>
                        <div className="modal__master-text">
                            <h2 className="modal__master-name">Светлана Иванова</h2>
                            <p className="modal__master-specialization">мастер парикмахер</p>
                            <p>рейтинг</p>
                        </div>
                    </div>
                    <div className="modal__master-choice">
                        <DropdownModal

                            dropdownTitle={'Выберите услугу'}
                            items={['Стрижка на короткие волосы', 'Стрижка на длинные волосы', 'Окрашивание', 'Укладка волос']}
                        />
                        <div className="modal__master-time">
                            <h2>Время доступное для записи</h2>
                            <p>{choiceDay}</p>
                            <div className="modal__master-grid">
                                {cell.map((time) =>
                                    <span key={time} className="modal__master-cell">{time}</span>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="modal__form">
                        <div className="">
                            <label  >Имя:</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label >Телефон:</label>
                            <input type="tel" />
                        </div>
                        <div >
                            <label  >Комментарий к записи:</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="modal__btn-wrap">
                        <button className="modal__btn">Записаться</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default ModalWindow