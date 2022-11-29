export const GET_ALL_SERVICE_GROUPS = '@@salons/GET_ALL_SERVICE_GROUPS';
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
      dispatch(getAllDeliverablesAction(res.data));
    })
    .catch(e => console.log(e));
}

/**
 *  Группы услуг
*/
export const getAllServiceGroupsAction = (date) => ({
  type: GET_ALL_SERVICE_GROUPS,
  payload: date
});
/**
 * Получение всех груп услуг
*/
export const getAllServiceGroupsThunk = () => async (dispatch, getState) => {

  fetch('/api/v1/deliverable-groups')
    .then(req => req.json())
    .then(res => {
      console.log('getAllServiceGroupsThunk res:', res);
      dispatch(getAllServiceGroupsAction(res.data));
    })
    .catch(e => console.log(e));
}


