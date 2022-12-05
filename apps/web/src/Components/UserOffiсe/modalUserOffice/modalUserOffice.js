import React, { useState, useEffect } from "react";
import Rating from "../../Rating";
import './modalUserOffice.scss'


function ModalUserOffice({ changeModal, appointmentId, userId }) {

    console.log('a' + appointmentId, 'u' + userId)

    const [score, setScore] = useState()
    const [text, setText] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        console.log(e.target[5].value)
        console.log(score)
        changeModal()
        fetch(`/api/v1/reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                score: score,
                review: e.target[5].value,
                userId: userId,
                appointmentId: +appointmentId
            })
        })
            .then(res => res.json())
            .then(res => console.log(res))

    }
    function userRating(ret) {
        setScore(ret)
    }


    return (
        <div onClick={(e) => e.stopPropagation()} className="modal-user__block">
            <form onSubmit={e => handleSubmit(e)}>
                <div className="modal-user__rating">
                    <p> Оценить:  </p><Rating isAcive={true} reting='4' userRating={userRating} />
                </div>
                <div className="modal-user__textarea" >
                    <label  >Написать отзыв:</label>
                    <textarea className="modal-user__text" onChange={e => setText(e.target.value)} />
                </div>
                <button type="submit" className="modal-user__btn">отправить</button>
            </form>
        </div>
    )
}

export default ModalUserOffice