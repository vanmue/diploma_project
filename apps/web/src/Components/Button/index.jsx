import React from 'react';
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
      {children}
    </button>
  )
}

Button.propTypes = {
  children: propTypes.string.isRequired,
  background: propTypes.string.isRequired
}

export default React.memo(Button);