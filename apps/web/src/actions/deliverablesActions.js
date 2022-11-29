export const GET_GROUPS_SERVICES = '@@salons/GET_GROUPS_SERVICES';
export const GET_ALL_DELIVERABLES = '@@salons/GET_ALL_DELIVERABLES';

/**
 *  Услуги
*/
export const getAllDeliverablesAction = (date) => ({
  type: GET_ALL_DELIVERABLES,
  payload: date
});
/**
 * Получение всех услуг
*/
export const getAllDeliverablesThunk = (data) => async (dispatch, getState) => {

  fetch('/api/v1/deliverables')
    .then(req => req.json())
    .then(res => {
      console.log('getAllDeliverablesThunk res:', res);
      dispatch(getAllDeliverablesAction(res.data));
    })
  // .catch(console.log('postNewSalonThunk: ', 'Что-то не получилось'));
}


