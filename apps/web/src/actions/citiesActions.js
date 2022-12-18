import { CITIES_URL } from "../constants/api";
// import { CITIES_URL } from "../constants/api";


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

  try {
    const res = await fetch('/api/v1/citie');
    if (!res.ok) throw new Error({ ok: res.ok, status: res.status, statusText: res.statusText });
    const data = await res.json();
    dispatch(getCitiesAction(data.data));
    console.log('dispatch: ', getState().citiesReducer);

  } catch (error) {
    console.log('getCitiesThunk ERROR: ', error.message)
  }

  // fetch(CITIES_URL)
  // await fetch('/api/v1/citie')
  //   .then(res => {
  //     console.log('res: ', res);
  //     if (!res.ok) Promise.reject('status > 299');
  //     // if (!res.ok) throw new Error('status > 299');
  //     return res.json()
  //   })
  //   .then(res => {
  //     dispatch(getCitiesAction(res.data));

  //   })
  //   .catch(error => console.error('getCitiesThunk ERROR: ', error));
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
 * Get запрос на получение  города по его id
*/
export const getCitiesByIdThunk = (id) => async (dispatch, getState) => {

  fetch(`${CITIES_URL}/${id}`)
    .then(req => req.json())
    .then(res => {
      dispatch(getCitiesByIdAction(res.data));
    })
    .catch(err => console.log('getCitiesThunk ERROR: ', err));
}