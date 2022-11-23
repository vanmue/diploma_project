import React from 'react';
import { useState } from 'react';
import './dropdownModal.scss';

function DropdownModal({
    dropdownTitle,
    items,
    setChoice
}) {
    const [value, setValue] = useState(dropdownTitle)
    const [btnActive, setBtnActive] = useState(false);

    const handleClickBtn = () => {
        setBtnActive(!btnActive);
    }
    const handleClickListItem = (e, id) => {
        setValue(e.currentTarget.innerHTML)
        setBtnActive(!btnActive)
        setChoice({ value: e.currentTarget.innerHTML, id: id })

    }

    return (
        <div className="dropdown__modal-select">
            <div
                className="dropdown__modal-select__btn"
                onClick={handleClickBtn}
            >
                <p>{value}</p>
                <div className="dropdown__modal-select__img">
                    <svg width="20" height="10" viewBox="0 0 22 12" fill="none">
                        <path d="M21.3536 1.35355C21.5488 1.15829 21.5488 0.841709 21.3536 0.646447C21.1583 0.451184 20.8417 0.451184 20.6464 0.646447L21.3536 1.35355ZM11 11L10.6464 11.3536C10.8417 11.5488 11.1583 11.5488 11.3536 11.3536L11 11ZM1.35355 0.646447C1.15829 0.451184 0.841709 0.451184 0.646447 0.646447C0.451184 0.841709 0.451184 1.15829 0.646447 1.35355L1.35355 0.646447ZM20.6464 0.646447L10.6464 10.6464L11.3536 11.3536L21.3536 1.35355L20.6464 0.646447ZM11.3536 10.6464L1.35355 0.646447L0.646447 1.35355L10.6464 11.3536L11.3536 10.6464Z" fill="white" />
                    </svg>
                </div>
            </div>
            <ul
                className="dropdown__modal-select__list"
                style={{ display: btnActive ? "block" : "none" }}
            >

                {items[0]?.map((item) =>
                    <li
                        style={{ cursor: 'pointer' }}
                        className="dropdown__modal-select__list-item"
                        key={item?.id}
                        onClick={(e) => handleClickListItem(e, item?.id)}
                    >
                        {item?.name}
                    </li>
                )}
            </ul>
        </div>
    )
}



export default DropdownModal;