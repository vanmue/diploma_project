export const POST_NEW_USER = '@@authorization/POST_NEW_USER';

export const POST_LOGIN_START = '@@authorization/POST_LOGIN_START';
export const POST_LOGIN_SUCCESS = '@@authorization/POST_LOGIN_SUCCESS';
export const POST_LOGIN_FAILURE = '@@authorization/POST_LOGIN_FAILURE';

export const GET_AUTH_START = '@@authorization/GET_AUTH_START';
export const GET_AUTH_SUCCESS = '@@authorization/GET_AUTH_SUCCESS';
export const GET_AUTH_FAILURE = '@@authorization/GET_AUTH_FAILURE';

export const POST_SET_ROLE_CUSTOMER = '@@authorization/POST_SET_ROLE_CUSTOMER';

export const GET_ME_PROFILES_START = '@@authorization/GET_ME_PROFILES_START';
export const GET_ME_PROFILES_SUCCESS = '@@authorization/GET_ME_PROFILES_SUCCESS';
export const GET_ME_PROFILES_FAILURE = '@@authorization/GET_ME_PROFILES_FAILURE';

export const IS_ACTIVE_SIGNIN_MODAL = '@@authorization/IS_ACTIVE_SIGNIN_MODAL';

export const LOGOUT = '@@authorization/LOGOUT';

let token = localStorage.getItem("access_token");

/**
 * Выход из профиля  
*/
/******************************************************************/
/**
 * Стираем JWT токен, стираем userStructure 
*/
export const logoutAction = () => ({
  type: LOGOUT,
});


/**
 * Создание пользователя  
*/
/******************************************************************/
/**
 * @param {{}} date - данные вновь созданного user-а  
*/
export const postNewUserAction = (date) => ({
  type: POST_NEW_USER,
  payload: date
});

/**
 * Post запрос на создание нового пользователя
 * @param {{
 * name: {string},
 * surname: {string},
 * email: {string},
 * password: {string},
 * avatarId: {number}
 * }} date - данные созданного user-а 
*/
export const postNewUserThunk = (data) => async (dispatch, getState) => {

  fetch('/api/v1/users', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(req => req.json())
    .then(res => {
      console.log('postNewUserThunk res: ', res);
      dispatch(postSetRoleCustomerThunk(res.data.id));
    })
    .catch(err => console.log('postNewUserThunk ERROR: ', err));
}

/**
 * Установка роли customer новому зарегестрированному пользователю
*/
/******************************************************************/
/**
 * @param {string} date - роль вновь созданного user-а  
*/
export const postSetRoleCustomerAction = (date) => ({
  type: POST_SET_ROLE_CUSTOMER,
  payload: date
});

/**
 * Post запрос установки роли новому пользователю
 * @param {} date - id только что зарегестрированного user-a
*/
export const postSetRoleCustomerThunk = (data) => async (dispatch, getState) => {

  fetch('/api/v1/profiles', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ profile_type: "customer", userId: +data })
  })
    .then(req => req.json())
    .then(res => {
      console.log('postSetRoleCustomerThunk res: ', res);
      // dispatch(postSetRoleCustomerAction());
    })
    .catch(err => console.log('postSetRoleCustomerThunk ERROR: ', err));
}

/**
 * Получение  JWT токена  
*/
/******************************************************************/
/**
 * Начало запроса на получение access_token
 * установка isLiading: true
*/
export const postloginStartAction = () => ({
  type: POST_LOGIN_START,
});
/**
 * Установка access_token-a
 * @param {{}} date -  access_token
*/
export const postloginSuccessAction = (data) => ({
  type: POST_LOGIN_SUCCESS,
  payload: data
});
/**
 * Получили ошибку
 * @param {string} date - ошибка
*/
export const postloginFailureAction = (data) => ({
  type: POST_LOGIN_FAILURE,
  payload: data
});

/**
 * Post запрос на получение access_token
 * @param {{
 * email: {string},
 * password: {string},
 * }} date - email и password user-а 
*/
export const postloginThunk = (data) => async (dispatch, getState) => {

  dispatch(postloginStartAction());

  fetch('/api/v1/auth/login/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      console.log('postloginThunk res: ', res);
      dispatch(postloginSuccessAction(res.data.access_token));
    })
    .then(() => {
      dispatch(getAuthThunk(localStorage.getItem('access_token')));
    })
    .catch(err => dispatch(postloginFailureAction(err)));
}

/**
 * Получение структуры пользователя 
*/
/******************************************************************/
/**
 * Начало запроса аутентификации
*/
export const getAuthStartAction = () => ({
  type: GET_AUTH_START
});
/**
 * Успешное завершение запроса аутентификации
 * @param {object} date - структура данных пользователя
*/
export const getAuthSuccessAction = (data) => ({
  type: GET_AUTH_SUCCESS,
  payload: data
});
/**
 * Завершение запроса аутентификации с ошибкой
 * @param {string} date - ошибка
*/
export const getAuthFailureAction = (data) => ({
  type: GET_AUTH_FAILURE,
  payload: data
});

/**
 * Аутентификация
 * Post запрос на получение структуры данных user-a
 * 
 * @param {{
 * email: {string},
 * password: {string},
 * }} date - email и password user-а 
*/
export const getAuthThunk = (data) => async (dispatch, getState) => {

  dispatch(getAuthStartAction());

  fetch('/api/v1/me', {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${data}`
    },
  })
    .then(req => req.json())
    .then(res => {
      console.log('getAuthThunk структура user res: ', res);
      dispatch(getAuthSuccessAction(res.data));
    })
    .then(dispatch(getMeProfilesThunk()))
    .catch(err => dispatch(getAuthFailureAction(err)));
}


/**
 * Получение списка всех типов профилей
*/
/******************************************************************/
/**
 * Начало GET запроса
*/
export const getMeProfilesStartAction = (date) => ({
  type: GET_ME_PROFILES_START,
  payload: date
});
/**
 * Успешное выполнение GET запроса
*/
export const getMeProfilesSuccessAction = (date) => ({
  type: GET_ME_PROFILES_SUCCESS,
  payload: date
});
/**
 * Завершение с ошибкой GET
*/
export const getMeProfilesFailureAction = (date) => ({
  type: GET_ME_PROFILES_FAILURE,
  payload: date
});

/** 
 * GET запрос на получение списка всех типов профилей
 * @param {} date -  
*/
export const getMeProfilesThunk = (data) => async (dispatch, getState) => {

  dispatch(getMeProfilesStartAction());

  fetch("/api/v1/me/profiles", {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("access_token")}`
    },
  })
    .then(req => req.json())
    .then(res => {
      dispatch(getMeProfilesSuccessAction(res.data));

    })
    .catch(err => {
      console.log('getMeProfilesThunk err: ', err);

      dispatch(getMeProfilesFailureAction(err));
    });
}

/**
 * Активация модального окна регистрации/входа
*/
/******************************************************************/
/**
 * Показать/скрыть
*/
export const isActiveSignInModalAction = (data) => ({
  type: IS_ACTIVE_SIGNIN_MODAL,
  payload: data
});

