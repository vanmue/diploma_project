import {
  POST_NEW_USER,
  POST_LOGIN,
  IS_LOGIN,
  GET_AUTH,
} from "../actions/authorizationActions";

const initialStore = {
  accessToken: null,    //{string} -  access_token
  userStructure: null,
  isLogin: false,       //{boolean} - статус ответа сервера на post login
}

export default function authorizationReducer(store = initialStore, action) {
  switch (action.type) {
    // case POST_NEW_USER: {
    //   return {
    //     ...store,
    //     userData: action.payload
    //   }
    // }
    case POST_LOGIN: {
      localStorage.setItem('access_token', action.payload);
      // localStorage.setItem('access_token', JSON.stringify(action.payload));
      // console.log('authorizationReducer POST_LOGIN action.payload: ', action.payload);
      return {
        ...store,
        accessToken: action.payload
      }
    }
    case IS_LOGIN: {
      return {
        ...store,
        userData: action.payload
      }
    }
    case GET_AUTH: {
      return {
        ...store,
        userStructure: action.payload
      }
    }
    default:
      return store;
  }
}