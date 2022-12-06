export const POST_NEW_USER = '@@authorization/POST_NEW_USER';
export const POST_LOGIN = '@@authorization/POST_LOGIN';
export const GET_AUTH = '@@authorization/GET_AUTH';
export const IS_LOGIN = '@@authorization/IS_LOGIN';


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
      // dispatch(postNewUserAction(res.data));
    })
    .catch(err => console.log('postNewUserThunk ERROR: ', err));
}
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
  // console.log('getState ', getState().authorizationReducer.isLogin)
  fetch('/api/v1/auth/login/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      console.log('postloginThunk res res.status: ', res.ok);
      // if (res.ok == true) dispatch(isLoginAction(!getState().authorizationReducer.isLogin));
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

