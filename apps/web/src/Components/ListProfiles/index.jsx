import React, { useEffect, useCallback } from "react";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import Button from "../Button";
import './list-profiles.scss'

function ListProfiles({
  struct
}) {

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("ListProfiles struct:", struct);
  });

  const callbacks = {
    onRedirect: useCallback(() => {
      navigate("/", { state: { userStruct: struct } })
    })
  }

  return (
    <ul className="list-profiles">
      {struct.profiles.map((el, index) => (
        <li className="list-profiles__item" key={index}>
          <Button
            onClick={callbacks.onRedirect}
          >
            {el.profile_type == "customer" ? "Пользователь" :
              el.profile_type == "master" ? "Мастер" :
                el.profile_type == "shop_manager" ? "Админ" :
                  ""
            }
          </Button>
        </li>
      ))}
      {/* <li className="list-profiles__item list-profiles__customer">
        <Button>Пользователь</Button>
      </li>
      <li className="list-profiles__item list-profiles__master">
        Мастер
      </li>
      <li className="list-profiles__item list-profiles__shop-manager">
        Администратор
      </li>
      <li className="list-profiles__item list-profiles__root">
        ROOT
      </li> */}
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