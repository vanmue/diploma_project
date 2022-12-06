import React, { useState } from "react";
import '../modalUserOffice/modalUserOffice.scss'


function ModalChangeUserInfo({ userInfo, toChangeUser }) {

    const [text, setText] = useState('')
    const [formChangeInfo, setFormChangeInfo] = useState(userInfo)

    function handleChange(e) {
        console.log(e)
        setFormChangeInfo({ ...formChangeInfo, [e.target.id]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        toChangeUser(formChangeInfo)

    }
    return (
        <div className="modal-user__block">
            <form onSubmit={e => handleSubmit(e)} >
                <div className="modal-user__textarea" >
                    <label className="modal-user__label">Имя:</label>
                    <input id='name' className="modal-user__input" type="text" defaultValue={userInfo?.name} onChange={e => setText(e)} onBlur={e => handleChange(e)} />
                </div>
                <div className="modal-user__textarea" >
                    <label className="modal-user__label">Фамилия:</label>
                    <input id='surname' className="modal-user__input" type="text" defaultValue={userInfo?.surname} onChange={e => setText(e)} onBlur={e => handleChange(e)} />
                </div>


                <div className="modal-user__textarea" >
                    <label className="modal-user__label">Mail:</label>
                    <input id='email' className="modal-user__input" type="text" defaultValue={userInfo?.email} onChange={e => setText(e)} onBlur={e => handleChange(e)} />
                </div>
                <div className="modal-user__textarea" >
                    <label className="modal-user__label">Телефон:</label>
                    <input id='phone' className="modal-user__input" type="tel" pattern="[0-9]{11}" defaultValue={userInfo?.phone} onChange={e => setText(e)} onBlur={e => handleChange(e)} />
                </div>
                <div className="modal-user__textarea" >
                    <label className="modal-user__label">Пароль:</label>
                    <input id='password' className="modal-user__input" type="password" defaultValue='' onChange={e => setText(e)} onBlur={e => handleChange(e)} />
                </div>
                <button type="submit" className="modal-user__btn">отправить</button>
            </form>
        </div>
    )
}

export default ModalChangeUserInfo