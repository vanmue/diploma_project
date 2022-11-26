export const GET_MASTER_ID = 'GET_MASTER';
export const SET_ACTIVE_MASTER_ID = '@@masterId/SET_ACTIVE_MASTER_ID';


/**
 * Установка id для активного мастера
*/
export const setIdActiveMasterAction = (date) => ({
  type: SET_ACTIVE_MASTER_ID,
  payload: date
});