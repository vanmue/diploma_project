import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import { logoutAction } from "../../actions/authorizationActions";
import Button from "../Button";
import './list-profiles.scss'

// const userStructure = JSON.parse(localStorage.getItem("userStructure"));

function ListProfiles({
  // userStructure
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log('ListProfiles JSON.parse(localStorage.getItem("userStructure")):', JSON.parse(localStorage.getItem("userStructure")));
  // });

  const callbacks = {
    onLogout: useCallback(() => {
      dispatch(logoutAction());
      navigate("/")
    })
    // onRedirect: useCallback(() => {
    //   navigate("/", { state: { userStruct: struct } })
    // })
  }

  return (
    <ul className="list-profiles">
      {JSON.parse(localStorage.getItem("userStructure")).profiles.map((el, index) => (
        <li className="list-profiles__item" key={index}>
          <Button
            linkTo={el.profile_type == "customer" ? "/user-office" :
              el.profile_type == "shop_manager" ? "/salon-admine-office" :
                el.profile_type == "master" ? "/master-office" :
                  el.profile_type == "root" ? "/root-office" :
                    ""}
          // onClick={callbacks.onRedirect}
          >
            {el.profile_type == "customer" ? "Пользователь" :
              el.profile_type == "master" ? "Мастер" :
                el.profile_type == "shop_manager" ? "Админ" :
                  el.profile_type == "root" ? "ROOT" :
                    ""
            }
          </Button>
        </li>
      ))}
      <li className="list-profiles__item">
        <Button
          onClick={callbacks.onLogout}
        >
          Выйти
        </Button>
      </li>
    </ul>
  )
}

ListProfiles.propTypes = {
  struct: propTypes.object
}

ListProfiles.defaultProps = {
  struct: {}
}

export default React.memo(ListProfiles);