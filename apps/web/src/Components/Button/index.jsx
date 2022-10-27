import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './button.scss';

function Button({
  children,
  background
}) {

  return (
    <button
      className='button'
      style={{ background: `${background}` }}
    >
      <Link
        end
        to="/master"
      >
        {children}
      </Link>
    </button>
  )
}

Button.propTypes = {
  children: propTypes.string.isRequired,
  background: propTypes.string.isRequired
}

export default React.memo(Button);