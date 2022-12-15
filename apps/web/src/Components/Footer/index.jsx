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
          <div className="footer__copyright">
            Copyright © 2022
          </div>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer);