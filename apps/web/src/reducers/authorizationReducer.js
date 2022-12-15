import {
  POST_NEW_USER,
  POST_LOGIN_START,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  GET_AUTH_START,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILURE,
  GET_ME_PROFILES_START,
  GET_ME_PROFILES_SUCCESS,
  GET_ME_PROFILES_FAILURE,
  IS_ACTIVE_SIGNIN_MODAL,
  LOGOUT,
} from "../actions/authorizationActions";

const initialStore = {
  loginData: {
    accessToken: null,          // {string || null} -  access_token
    isLoading: false,           // {boolean} -  состояние запроса
    error: null                 // {string || null} -  ошибка
  },
  authData: {
    userStructure: null,        // {object || null} - стуктура данных пользователя
    isLoading: false,           // {boolean} -  состояние запроса
    error: null                 // {string || null} -  ошибка
  },
  getMeProfilesData: {
    response: null,             // {object || null}
    isLoading: false,           // {boolean} -  состояние запроса
    error: null                 // {string || null} -  ошибка
  },
  isActiveSignInModal: false     // {boolean} - показать/скрыть модальное окно signIn 
}

export default function authorizationReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_ME_PROFILES_START: {
      return {
        ...store,
        getMeProfilesData: {
          ...store.getMeProfilesData,
          isLoading: true
        }
      }
    }
    case GET_ME_PROFILES_SUCCESS: {
      let salonId = action.payload.find(el => el.profile_type == "shop_manager").entity_id;
      localStorage.setItem("activeSalonId", JSON.stringify(salonId))
      return {
        ...store,
        getMeProfilesData: {
          ...store.getMeProfilesData,
          response: action.payload,
          isLoading: false
        }
      }
    }
    case GET_ME_PROFILES_FAILURE: {
      return {
        ...store,
        getMeProfilesData: {
          ...store.getMeProfilesData,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case LOGOUT: {
      localStorage.setItem("access_token", null);
      localStorage.setItem("userStructure", null);
      localStorage.setItem("activeSalonId", null);
      localStorage.setItem("profilId", null);
      return {
        ...store,
      }
    }
    // case POST_NEW_USER: {
    //   return {
    //     ...store,
    //     userData: action.payload
    //   }
    // }
    case POST_LOGIN_START: {
      return {
        ...store,
        loginData: {
          ...store.loginData,
          isLoading: true,
        }
      }
    }
    case POST_LOGIN_SUCCESS: {
      localStorage.setItem('access_token', action.payload);
      return {
        ...store,
        loginData: {
          accessToken: action.payload,
          isLoading: false,
          error: null
        }
      }
    }
    case POST_LOGIN_FAILURE: {
      return {
        ...store,
        loginData: {
          ...store.loginData,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case GET_AUTH_START: {
      return {
        ...store,
        authData: {
          ...store.authData,
          isLoading: true,
        }
      }
    }
    case GET_AUTH_SUCCESS: {
      localStorage.setItem("userStructure", JSON.stringify(action.payload));
      return {
        ...store,
        authData: {
          userStructure: action.payload,
          isLoading: false,
          error: null
        }
      }
    }
    case GET_AUTH_FAILURE: {
      return {
        ...store,
        authData: {
          ...store.authData,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case IS_ACTIVE_SIGNIN_MODAL: {
      return {
        ...store,
        isActiveSignInModal: action.payload
      }
    }
    default:
      return store;
  }
}