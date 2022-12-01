export const GET_ALL_MASTERS = '@@masters/GET_ALL_MASTERS';
export const GET_FILTERING_MASTERS = '@@masters/GET_FILTERING_MASTERS';
export const GET_ALL_MASTERS_FOR_ACTIVE_SALON = '@@masters/GET_ALL_MASTERS_FOR_ACTIVE_SALON';
export const POST_IMAGE_FOR_MASTER = '@@salons/POST_IMAGE_FOR_MASTER';
// export const DECREMENT_ACTIVE_PAGE_PAGINATION = '@@salons/DECREMENT_ACTIVE_PAGE_PAGINATION';


/**
 * @param {number} date - id картинки лица мастера
*/
export const postImageForMasterAction = (date) => ({
  type: POST_IMAGE_FOR_MASTER,
  payload: date
});
/** 
 * POST запрос отправки картинки для лица мастера
 * @param {number} date - картинка
*/
export const postImageFormMasterThunk = (data) => async (dispatch, getState) => {

  // let formData = new formData();
  // formData.append('file', data.file);

  fetch('/api/v1/files', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'multipart/form-data;boundary="boundary"'
      // 'Content-Type': 'application/json;'
      // 'Content-Type': 'application/json;charset=utf-8'

      // 'Content-Disposition': 'form-data; name="is_preview"; name="shopId"'
    },
    // body: formData
    body: JSON.stringify(data)
  })
    .then(req => req.json())
    .then(res => {
      console.log('postImageFormMasterThunk res:', res);
      // dispatch(postImageForMasterAction(res));
    })
    .catch(err => console.log('postNewSalonThunk: ', err));
}



/**
 * @param {[{}]} date - все мастера
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
      dispatch(getMastersAction(res.data));
    })
    .catch(err => console.log('getMastersThunk: ', err))
}

/**
 *  @param {[{}]} date - мастера конкретного салона
*/
export const getAllMasterForActiveSalonAction = (date) => ({
  type: GET_ALL_MASTERS_FOR_ACTIVE_SALON,
  payload: date
});
/**
 * Get запрос на получение всеч мастеров для конкретного салона
 *  @param {number} activeSalonId - id активного салона
 *  @param {number} page - активная страница пагинации
*/
export const getAllMasterForActiveSalonThunk = (activeSalonId, page = 1) => async (dispatch, getState) => {

  const limit = 3;

  fetch(`/api/v1/shops/${activeSalonId}/masters/?limit=${limit}&page=${page}`)
    .then(req => req.json())
    .then(res => {
      // console.log('getAllMasterForActiveSalonThunk: ', res)
      dispatch(getAllMasterForActiveSalonAction(res.data));
    })
    .catch(err => console.log('getAllMasterForActiveSalonThunk: ', err))
}

/**
 * @param {[{}]} date - отфильтрованные мастера
*/
export const getFilteringMastersAction = (date) => ({
  type: GET_FILTERING_MASTERS,
  payload: date
});
/**
 * Get запрос на получение отфильтрованных мастеров
 *  @param {number || null} cityId - id города
 *  @param {number || null} serviceId - id услуги
 *  @param {number || null} salonId - id салона
*/
export const getFilteringMastersThunk = (cityId = null, serviceId = null, salonId = null) => async (dispatch, getState) => {

  let city = cityId != null ? `city_id=${cityId}` : '';
  let service = serviceId != null ? `&deliverable_group_id=${serviceId}` : '';
  let salon = salonId != null ? `&shop_id=${salonId}` : '';
  // const limit = 10;

  fetch(`/api/v1/masters/?${city}${service}${salon}`)
    .then(req => req.json())
    .then(res => {
      // console.log('getFilteringMasterThunk: ', res.data)
      dispatch(getFilteringMastersAction(res.data));
    })
    .catch(err => console.log('getAllMasterForActiveSalonThunk: ', err));
}