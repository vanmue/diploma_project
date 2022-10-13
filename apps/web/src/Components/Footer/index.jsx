import React from 'react';
import './footer.scss';

function Footer() {
  return (
    <footer className='footer'>
      <div className="container">
        <div className="footer__flex">
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
            <div className="footer__input">
              <input
                className="footer__input-email"
                type="email"
                placeholder='e-mail'
              />
              <button className="footer__input-button">Отправить</button>
            </div>
          </div>
          <div className="footer__copyright">
            Copyright © 2022
          </div>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer);