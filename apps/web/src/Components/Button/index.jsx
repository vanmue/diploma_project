import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './button.scss';

function Button({
  colorText,
  background,
  children,
  onClick,
  masterId
}) {

  const handleClick = (e) => {
    onClick(e);
  }

  return (
    <button
      className='button'
      style={{ background: `${background}` }}
      onClick={handleClick}
    >
      <Link
        // end
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
  masterId: propTypes.number,
  onClick: propTypes.func
}

Button.defaultProps = {
  onClick: () => { }
}

export default React.memo(Button);