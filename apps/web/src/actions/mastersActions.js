export const GET_ALL_MASTERS = '@@masters/GET_ALL_MASTERS';
export const GET_ALL_MASTERS_FOR_ACTIVE_SALON = '@@masters/GET_ALL_MASTERS_FOR_ACTIVE_SALON';
// export const DECREMENT_ACTIVE_PAGE_PAGINATION = '@@salons/DECREMENT_ACTIVE_PAGE_PAGINATION';

/**
 * Запись мастеров в reducer
*/
export const getMastersAction = (date) => ({
  type: GET_ALL_MASTERS,
  payload: date
});
/**
 * Get запрос на получение всеч мастеров
*/
export const getMastersThunk = () => async (dispatch, getState) => {
  fetch('/api/v1/masters')
    .then(req => req.json())
    .then(res => {
      // console.log('getMastersThunk: ', res.data)
      dispatch(getMastersAction(res.data));
    })
  // .catch(console.log('getMastersThunk: ', 'Что-то не получилось'))
}

/**
 * Получение всех мастеров для конкретного салона
*/
export const getAllMasterForActiveSalonAction = (date) => ({
  type: GET_ALL_MASTERS_FOR_ACTIVE_SALON,
  payload: date
});
/**
 * Get запрос на получение всеч мастеров для конкретного салона
*/
export const getAllMasterForActiveSalonThunk = (activeSalonId) => async (dispatch, getState) => {
  fetch(`/api/v1/shops/${activeSalonId}/masters`)
    .then(req => req.json())
    .then(res => {
      console.log('getAllMasterForActiveSalonThunk: ', res)
      dispatch(getAllMasterForActiveSalonAction(res.data));
    })
    .catch(console.log('getAllMasterForActiveSalonThunk: ', 'Что-то не получилось'))
}
