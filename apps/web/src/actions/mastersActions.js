export const GET_ALL_MASTERS = '@@masters/GET_ALL_MASTERS';
export const GET_FILTERING_MASTERS = '@@masters/GET_FILTERING_MASTERS';
export const GET_ALL_MASTERS_FOR_ACTIVE_SALON = '@@masters/GET_ALL_MASTERS_FOR_ACTIVE_SALON';
export const POST_IMAGE_FOR_MASTER = '@@masters/POST_IMAGE_FOR_MASTER';
export const POST_NEW_MASTER = '@@masters/POST_NEW_MASTER';
export const POST_SET_ROLE_MASTER = '@@masters/POST_SET_ROLE_MASTER';
// export const DECREMENT_ACTIVE_PAGE_PAGINATION = '@@salons/DECREMENT_ACTIVE_PAGE_PAGINATION';


/**
 * 
*/
export const postSetRoleMasterAction = (date) => ({
  type: POST_SET_ROLE_MASTER,
  payload: date
});
/** 
 * POST запрос. Устанавливаем роль
 * @param {{}} date -  {profile_type: "master", userId: 91 }
*/
export const postSetRoleThunk = (data) => async (dispatch, getState) => {

  fetch("/api/v1/profiles", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(req => req.json())
    .then(res => {
      console.log('postSetRoleThunk res:', res);
      if (data.profile_type == 'master') dispatch(postSetRoleMasterAction(res.data));

    })
    .catch(err => console.log('postSetRoleThunk: ', err));
}


/**
 * 
*/
export const postNewMasterAction = (date) => ({
  type: POST_NEW_MASTER,
  payload: date
});
/** 
 * POST запрос на создание мастера
 * @param {{}} date - данные мастера
*/
export const postNewMasterThunk = (data) => async (dispatch, getState) => {

  // let formData = new FormData();
  // formData.append("file", data);

  fetch("/api/v1/masters", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(req => req.json())
    .then(res => {
      console.log('postNewMasterThunk res:', res);
      // dispatch(postImageForMasterAction(res.data.id));
    })
    .catch(err => console.log('postNewMasterThunk: ', err));
}


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

  let formData = new FormData();
  formData.append("file", data);

  fetch("/api/v1/files", {
    method: "POST",
    body: formData
  })
    .then(req => req.json())
    .then(res => {
      console.log('postImageFormMasterThunk res:', res);
      dispatch(postImageForMasterAction(res.data.id));
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
export const getAllMasterForActiveSalonAction = (data) => ({
  type: GET_ALL_MASTERS_FOR_ACTIVE_SALON,
  payload: data
});
/**
 * Get запрос на получение всеч мастеров для конкретного салона
 *  @param {number} activeSalonId - id активного салона
 *  @param {number} page - активная страница пагинации
*/
export const getAllMasterForActiveSalonThunk = (activeSalonId, page = 1) => async (dispatch, getState) => {

  const limit = 5;

  fetch(`/api/v1/shops/${activeSalonId}/masters/?limit=${limit}&page=${page}`)
    .then(req => req.json())
    .then(res => {
      console.log('getAllMasterForActiveSalonThunk: ', res)
      dispatch(getAllMasterForActiveSalonAction(res));
    })
    .catch(err => console.log('getAllMasterForActiveSalonThunk: ', err))
}

/**
 * @param {[{}]} date - отфильтрованные мастера
*/
export const getFilteringMastersAction = (date, pagination) => ({
  type: GET_FILTERING_MASTERS,
  payload: {
    date,
    pagination
  }
});
/**
 * Get запрос на получение отфильтрованных мастеров
 *  @param {number || null} cityId - id города
 *  @param {number || null} serviceId - id услуги
 *  @param {number || null} salonId - id салона
*/
export const getFilteringMastersThunk = (cityId = null, serviceId = null, salonId = null, activePage = 1) => async (dispatch, getState) => {

  let city = cityId != null ? `city_id=${cityId}` : '';
  let service = serviceId != null ? `&deliverable_group_id=${serviceId}` : '';
  let salon = salonId != null ? `&shop_id=${salonId}` : '';
  const limit = '&limit=5';
  const page = `&page=${activePage}`;

  fetch(`/api/v1/masters/?${city}${service}${salon}${limit}${page}`)
    .then(req => req.json())
    .then(res => {
      // console.log('getFilteringMasterThunk: ', res.data)
      dispatch(getFilteringMastersAction(res.data, res.pagination));
    })
    .catch(err => console.log('getFilteringMastersThunk: ', err));
}