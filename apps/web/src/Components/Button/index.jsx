import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './button.scss';

function Button({
  colorText,
  background,
  children,
  masterId
}) {

  return (
    <button
      className='button'
      style={{ background: `${background}` }}
    >
      <Link
        end
        to="/master"
        style={{ color: `${colorText}` }}
      >
        {children}
      </Link>
    </button>
  )
}

Button.propTypes = {
  background: propTypes.string.isRequired,
  colorText: propTypes.string.isRequired,
  children: propTypes.string.isRequired,
  masterId: propTypes.number
}

export default React.memo(Button);