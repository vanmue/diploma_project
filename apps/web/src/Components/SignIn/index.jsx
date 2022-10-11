import React from "react";
import './sign-in.scss'

function SignIn() {
  return (
    <button className="sign-in">
      <span>Личный кабинет</span>
    </button>
  )
}

export default React.memo(SignIn);