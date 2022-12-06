import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './button.scss';

function Button({
  colorText,
  background,
  children,
  linkTo,
  onClick,
}) {

  const handleClick = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
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
        to={linkTo ? linkTo : ""}
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
  linkTo: propTypes.string,
  onClick: propTypes.func
}

Button.defaultProps = {
  linkTo: '',
  onClick: () => { }
}

export default React.memo(Button);