export const GET_ALL_ADVANTAGES = '@@advantages/GET_ALL_ADVANTAGES';

/******************************************************************/
/**
 * @params {array} date - массив объектов  с преимуществами салонов
*/
export const getAllAdvantagesAction = (date) => ({
  type: GET_ALL_ADVANTAGES,
  payload: date
});

/**
 * Get запрос на получение  всех преимуществ
*/
export const getAllAdvantagesThunk = () => async (dispatch, getState) => {
  fetch('/api/v1/shop-advantages')
    .then(req => req.json())
    .then(res => {
      dispatch(getAllAdvantagesAction(res.data));
    })
    .catch(err => console.log('getAllAdvantagesThunk: ', err));
}
