export const GET_ALL_CITIES = '@@cities/GET_ALL_CITIES';
export const GET_ALL_CITIES_SUCCESS = '@@cities/GET_ALL_CITIES_SUCCESS';

/**
 * Массив всех городов
 * @params {array} date - массив объектов  с городами
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
  // .catch(console.log('getCitiesThunk: ', 'Что-то не получилось'));
}

