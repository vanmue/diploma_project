export const GET_MASTER_ID = 'GET_MASTER';
export const SET_ACTIVE_MASTER_ID = '@@masterId/SET_ACTIVE_MASTER_ID';


/**
 * Установка id для активного мастера
*/
export const setIdActiveMasterAction = (date) => ({
  type: SET_ACTIVE_MASTER_ID,
  payload: date
});

export const getMasterIdAction = (date) => ({
  type: GET_MASTER_ID,
  payload: date
})
export const getMasterIdActionThunk = (masterId) => async (dispatch, getState) => {
  fetch(`/api/v1/appointments/?master_id=${masterId}`)
    .then(req => req.json())
    .then(res => {
      dispatch(getMasterIdAction(res.data[0]));
    })
}