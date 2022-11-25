export const GET_ALL_MASTERS = '@@masters/GET_ALL_MASTERS';
export const GET_FILTERING_MASTERS = '@@masters/GET_FILTERING_MASTERS';
export const GET_ALL_MASTERS_FOR_ACTIVE_SALON = '@@masters/GET_ALL_MASTERS_FOR_ACTIVE_SALON';
// export const DECREMENT_ACTIVE_PAGE_PAGINATION = '@@salons/DECREMENT_ACTIVE_PAGE_PAGINATION';

/**
 * Запись всех мастеров в reducer
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
 * Запись всех мастеров для конкретного салона в reducer
*/
export const getAllMasterForActiveSalonAction = (date) => ({
  type: GET_ALL_MASTERS_FOR_ACTIVE_SALON,
  payload: date
});
/**
 * Get запрос на получение всеч мастеров для конкретного салона
*/
export const getAllMasterForActiveSalonThunk = (activeSalonId, page = 1) => async (dispatch, getState) => {

  const limit = 3;

  fetch(`/api/v1/shops/${activeSalonId}/masters/?limit=${limit}&page=${page}`)
    .then(req => req.json())
    .then(res => {
      console.log('getAllMasterForActiveSalonThunk: ', res)
      dispatch(getAllMasterForActiveSalonAction(res.data));
    })
  // .catch(console.log('getAllMasterForActiveSalonThunk: ', 'Что-то не получилось'))
}

/**
 * Фильтрация мастеров
*/
export const getFilteringMastersAction = (date) => ({
  type: GET_FILTERING_MASTERS,
  payload: date
});
/**
 * Get запрос на получение отфильтрованных мастеров]
*/
export const getFilteringMastersThunk = (cityId = null, serviceId = null, salonId = null) => async (dispatch, getState) => {

  let city = cityId != null ? `city_id=${cityId}` : '';
  let service = serviceId != null ? `&deliverable_group_id=${serviceId}` : '';
  let salon = salonId != null ? `&shop_id=${salonId}` : '';
  // const limit = 10;

  let address = '';

  // if (cityId == null && serviceId == null && salonId == null) {
  //   address = '/api/v1/masters';
  // } else if (serviceId == null && salonId == null) {
  //   address = `/api/v1/masters/?city_id=${cityId}`;
  // }

  fetch(`/api/v1/masters/?${city}${service}${salon}`)
    .then(req => req.json())
    .then(res => {
      console.log('getFilteringMasterThunk: ', res.data)
      dispatch(getFilteringMastersAction(res.data));
    })
  // .catch(console.log('getAllMasterForActiveSalonThunk: ', 'Что-то не получилось'))
}