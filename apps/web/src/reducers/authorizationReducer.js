import {
  POST_NEW_USER,
  POST_LOGIN_START,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  GET_AUTH_START,
  GET_AUTH_SUCCESS,
  GET_AUTH_FAILURE,
} from "../actions/authorizationActions";

const initialStore = {
  loginData: {
    accessToken: null,          // {string || null} -  access_token
    isLoading: false,           // {boolean} -  состояние запроса
    error: null                 // {string || null} -  ошибка
  },
  authData: {
    userStructure: {
      avatar: {
        id: 1,
        path: "/uploads/e4acebbd-6fe0-451b-ba7d-8ad7a9d80d2e.png"
      },
      email: "2233445567890@mail.ru",
      id: 98,
      name: "name",
      phone: null,
      profiles: [
        {
          id: 213,
          profile_type: 'customer'
        }
      ],
      surname: "surname"
    },
    // userStructure: null,        // {object || null} - стуктура данных пользователя
    isLoading: false,           // {boolean} -  состояние запроса
    error: null                 // {string || null} -  ошибка
  },
}

export default function authorizationReducer(store = initialStore, action) {
  switch (action.type) {
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
    default:
      return store;
  }
}