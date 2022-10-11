import React from 'react';
import './footer.scss';

function Footer() {

  return (
    <div className='footer'>
      <div className="container">
        <div className="fooret__flex">
          <div className="footer__contacts">
            <p className="footer__contacts-title">
              Контакты:
            </p>
            <p className="footer__contacts-tel">
              +7 (495) 123-45-67
            </p>
            <p className="footer__contacts-email">
              info@youbeauty.ru
            </p>
          </div>
          <div className="footer__support">
            <p className="footer__support-title">
              Техническая поддержка:
            </p>
            <p className="footer__support-text">
              Напишите ваш вопрос и мы с вами свяжемся.
            </p>
            <div className="input">
              <input
                className="input-email"
                type="email"
                placeholder='e-mail'
              />
              <button className="input__button">Отправить</button>
            </div>
          </div>
          <div className="footer__copyright">
            Copyright © 2022
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Footer);