export const GET_MASTER_ID = 'GET_MASTER';
export const SET_ACTIVE_MASTER_ID = '@@masterId/SET_ACTIVE_MASTER_ID';


/**
 * Установка id для активного мастера 
 * и id  салона в котором он работает
 * @param {number} masterId - id активного мастера
 * @param {number} salonId - id салона в котором работает активный мастер
*/
export const setIdActiveMasterAction = (masterId, salonId) => ({
  type: SET_ACTIVE_MASTER_ID,
  payload: {
    masterId,
    salonId
  }
});

//
export const getMasterIdAction = (date) => ({
  type: GET_MASTER_ID,
  payload: date
})
export const getMasterIdActionThunk = (data) => async (dispatch, getState) => {
  fetch(`/api/v1/masters/${data}`)
    .then(req => req.json())
    .then(res => {
      dispatch(getMasterIdAction(res.data));
    })
}


