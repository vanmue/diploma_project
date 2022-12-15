export const GET_ALL_CITIES = '@@cities/GET_ALL_CITIES';
export const GET_ALL_CITIES_SUCCESS = '@@cities/GET_ALL_CITIES_SUCCESS';

export const GE_CITIES_BY_ID = '@@cities/GE_CITIES_BY_ID';

/**
 * Получение массива всех городов
 *
*/
/******************************************************************/
/**
 * Массив всех городов
 * @params {array} date - массив объектов с городами
*/
export const getCitiesAction = (date) => ({
  type: GET_ALL_CITIES,
  payload: date
});

/**
 * Get запрос на получение  всех городов
*/
export const getCitiesThunk = () => async (dispatch, getState) => {

  fetch('/api/v1/cities')
    .then(req => req.json())
    .then(res => {
      dispatch(getCitiesAction(res.data));
    })
    .catch(err => console.log('getCitiesThunk ERROR: ', err));
}

/**
 * Получение города по id
*/
/******************************************************************/
/**
 * Получение города по id
 * @params {array} date -
*/
export const getCitiesByIdAction = (date) => ({
  type: GE_CITIES_BY_ID,
  payload: date
});

/**
 * Get запрос на получение  всех городов
*/
export const getCitiesByIdThunk = (id) => async (dispatch, getState) => {

  fetch(`/api/v1/cities/${id}`)
    .then(req => req.json())
    .then(res => {
      dispatch(getCitiesByIdAction(res.data));
    })
    .catch(err => console.log('getCitiesThunk ERROR: ', err));
}