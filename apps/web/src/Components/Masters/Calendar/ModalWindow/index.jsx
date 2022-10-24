import React from "react";
import './modalWindow.scss'

function ModalWindow() {
    const image = require('../../img/fotoMasters.png')
    const servise = ['Стрижка на короткие волосы', 'Стрижка на длинные волосы', 'Окрашивание', 'Укладка волос']
    return <div className="fixed-overlay">
        <div className="modal">
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
                <div className="modal__select">
                    <div className="modal__select-servise" >
                        <div className="modal__select-btn">
                            <span>Выберите услугу</span>
                            <button type="button" className="itc-select__toggle" name="car" value="" data-select="toggle" data-index="-1">&#8744;</button>
                        </div>
                        <div className="itc-select__dropdown">
                            <ul className="itc-select__options">
                                {servise.map((item) => <li key={item}>{item}</li>)}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default ModalWindow