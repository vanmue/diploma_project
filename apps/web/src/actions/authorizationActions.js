export const POST_NEW_USER = '@@authorization/POST_NEW_USER';
export const POST_LOGIN = '@@authorization/POST_LOGIN';
export const GET_AUTH = '@@authorization/GET_AUTH';
export const IS_LOGIN = '@@authorization/IS_LOGIN';
export const POST_SET_ROLE_CUSTOMER = 'POST_SET_ROLE_CUSTOMER';


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
      // dispatch(postNewUserAction(res.data));
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
 * @param {{}} date -  access_token
*/
export const postloginAction = (date) => ({
  type: POST_LOGIN,
  payload: date
});

/**
 * @param {boolean} date - статус ответа сервера
*/
export const isLoginAction = (date) => ({
  type: IS_LOGIN,
  payload: date
});

/**
 * Post запрос на получение access_token
 * @param {{
 * email: {string},
 * password: {string},
 * }} date - email и password user-а 
*/
export const postloginThunk = (data) => async (dispatch, getState) => {
  fetch('/api/v1/auth/login/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      // console.log('postloginThunk res res.status: ', res.ok);
      return res.json();
    })
    .then(res => {
      dispatch(postloginAction(res.data.access_token));
    })
    .then(() => {
      // console.log('postloginThunk tt: ', tt);
      dispatch(getAuthThunk(localStorage.getItem('access_token')));
    })
    .catch(err => console.log('postloginThunk ERROR: ', err));
}

/**
 * Получение структуры пользователя 
*/
/******************************************************************/
/**
 * @param {{}} date -  структура данныч пользователя
*/
export const getAuthAction = (date) => ({
  type: GET_AUTH,
  payload: date
});

/**
 * Post запрос на получение структуры данных user-a
 * @param {{
 * email: {string},
 * password: {string},
 * }} date - email и password user-а 
*/
export const getAuthThunk = (data) => async (dispatch, getState) => {

  fetch('/api/v1/auth/me/', {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${data}`
    },
  })
    .then(req => req.json())
    .then(res => {
      console.log('getAuthThunk res: ', res);
      dispatch(getAuthAction(res.data));
    })
    .catch(err => console.log('getAuthThunk ERROR: ', err));
}

