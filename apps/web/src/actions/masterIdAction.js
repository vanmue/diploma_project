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
export const getMasterIdActionThunk = (data) => async (dispatch, getState) => {
  console.log(data)
  fetch(`/api/v1/masters/${data}`)
    .then(req => req.json())
    .then(res => {
      console.log(res)
      dispatch(getMasterIdAction(res.data));
    })
}


