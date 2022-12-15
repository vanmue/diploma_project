export const GET_ALL_SERVICE_GROUPS = '@@salons/GET_ALL_SERVICE_GROUPS';
export const GET_ALL_DELIVERABLES = '@@salons/GET_ALL_DELIVERABLES';

/**
 *Получение всех услуг
*/
/******************************************************************/
/**
 *  @params {array} date - массив объектов  со всеми услугами
*/
export const getAllDeliverablesAction = (date) => ({
  type: GET_ALL_DELIVERABLES,
  payload: date
});
/**
 * GET запрос на получение всех услуг
*/
export const getAllDeliverablesThunk = () => async (dispatch, getState) => {

  fetch('/api/v1/deliverables')
    .then(req => req.json())
    .then(res => {
      dispatch(getAllDeliverablesAction(res.data));
    })
    .catch(err => console.log('getAllDeliverablesThunk:', err));
}


/**
 * Получение всех групп услуг
*/
/******************************************************************/
/**
 *  Группы услуг
 * @params {array} date - массив объектов  со всеми группами услуг
*/
export const getAllServiceGroupsAction = (date) => ({
  type: GET_ALL_SERVICE_GROUPS,
  payload: date
});
/**
 * Get запрос на получение всех груп услуг
*/
export const getAllServiceGroupsThunk = () => async (dispatch, getState) => {

  fetch('/api/v1/deliverable-groups')
    .then(req => req.json())
    .then(res => {
      dispatch(getAllServiceGroupsAction(res.data));
    })
    .catch(err => console.log('getAllServiceGroupsThunk:', err));
}


