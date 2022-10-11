import React from "react";
import Navigation from "../Navigation";
import SignIn from "../SignIn";
import './header.scss'

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header__flex">
          <div className="label">
            <span>you</span>
            <span>beauty</span>
          </div>
          <div className="header__wrapp-navigation">
            <Navigation />
          </div>
          <div className="main__wrapp-sign-in">
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Header);