export const GET_GROUPS_SERVICES = '@@salons/GET_GROUPS_SERVICES';
export const GET_ALL_SALONS = '@@salons/GET_ALL_SALONS';
export const GET_ACTIVE_SALON_BY_ID = '@@salons/GET_ACTIVE_SALON_BY_ID';
export const GET_MASTERS_OF_ACTIVE_SALON = '@@salons/GET_MASTERS_OF_ACTIVE_SALON';
export const SET_ACTIVE_SALON_ID = '@@salons/SET_ACTIVE_SALON_ID';
export const GET_FILTERING_SALONS = '@@salons/GET_FILTERING_SALONS';
export const GET_FILTERING_SALONS_BY_CITY = '@@salons/GET_FILTERING_SALONS_BY_CITY';
export const CHANGE_ACTIVE_PAGE_FOR_PAGINATION = '@@salons/CHANGE_ACTIVE_PAGE_FOR_PAGINATION';
export const INCREMENT_ACTIVE_PAGE_PAGINATION = '@@salons/INCREMENT_ACTIVE_PAGE_PAGINATION';
export const DECREMENT_ACTIVE_PAGE_PAGINATION = '@@salons/DECREMENT_ACTIVE_PAGE_PAGINATION';
export const POST_NEW_SALON = '@@salons/POST_NEW_SALON';
export const POST_IMAGE_FOR_SALON = '@@salons/POST_IMAGE_FOR_SALON';
// export const CHANGE_ARRAY_PAGINATION = '@@salons/CHANGE_ARRAY_PAGINATION';

/**
 * Создание салона
*/
export const postNewSalonAction = (date) => ({
  type: POST_NEW_SALON,
  payload: date
});
/** 
 * Запрос на создание нового салона
*/
export const postNewSalonThunk = (data) => async (dispatch, getState) => {

  fetch('/api/v1/shops', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(req => req.json())
    .then(res => {
      console.log('postNewSalonThunk res:', res);
      // dispatch(postNewSalonAction(res));
    })
  // .catch(console.log('postNewSalonThunk: ', 'Что-то не получилось'));
}


/**
 * Картинка для салона
*/
export const postImageForSalonAction = (date) => ({
  type: POST_IMAGE_FOR_SALON,
  payload: date
});
/** 
 * Отправка картинки для салона в поле images
*/
export const postImageForSalonThunk = (data) => async (dispatch, getState) => {

  let formData = new FormData;
  formData.append('img', data.img);
  formData.append('is_preview', data.is_preview);
  formData.append('shopId', data.shopId);

  fetch('/api/v1/shop-images', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'multipart/form-data;boundary',
      'Content-Disposition': 'form-data; name="img"',
      'Content-Disposition': 'form-data; name="is_preview"',
      'Content-Disposition': 'form-data; name="shopId"',
      // 'Content-Type': 'multipart/form-data;boundary="boundary"'
      // 'Content-Type': 'application/json;'
      // 'Content-Type': 'application/json;charset=utf-8'

      // 'Content-Disposition': 'form-data; name="is_preview"; name="shopId"'
    },
    body: formData
    // body: new FormData(data)
    // body: JSON.stringify(data)
  })
    .then(req => req.json())
    .then(res => {
      console.log('postImageForSalonThunk res:', res);
      // dispatch(postImageForSalonAction(res));
    })
  // .catch(console.log('postNewSalonThunk: ', 'Что-то не получилось'));
}


/**
 * Получение всех салонов
*/
export const getAllSalonsAction = (date) => ({
  type: GET_ALL_SALONS,
  payload: date
});
/** 
 * Запрос на получение всеч салонов
*/
export const getAllSalonsThunk = () => async (dispatch, getState) => {

  fetch('/api/v1/shops')
    .then(req => req.json())
    .then(res => {
      // console.log('getAllSalonsThunk res:', res.data);
      dispatch(getAllSalonsAction(res.data));
    })
  // .catch(console.log('getFilteringSalonsThunk: ', 'Что-то не получилось'));
}

/**
 * Отфильтрованные салоны или все салоны
*/
export const getSalonsAction = (date) => ({
  type: GET_FILTERING_SALONS,
  payload: date
});
/** 
 * Запрос на получение выборки салонов
 * @param {number} cityId - id города
 * @param {number} serviceId - id услуги
*/
export const getFilteringSalonsThunk = (cityId = null, serviceId = null, page = 1) => async (dispatch, getState) => {

  const limit = 3;
  let address = '';

  if (serviceId == null && cityId == null) {
    address = `/api/v1/shops/?limit=${limit}&page=${page}`
  } else if (cityId == null) {
    address = `/api/v1/shops/?deliverable_group_id=${serviceId}&limit=${limit}&page=${page}`
  } else if (serviceId == null) {
    address = `/api/v1/shops/?city_id=${cityId}&limit=${limit}&page=${page}`
  } else {
    address = `/api/v1/shops/?city_id=${cityId}&deliverable_group_id=${serviceId}&limit=${limit}&page=${page}`;
  }

  fetch(address)
    .then(req => req.json())
    .then(res => {
      dispatch(getSalonsAction(res.data));
    })
  // .catch(console.log('getFilteringSalonsThunk: ', 'Что-то не получилось'));
}

/**
 * Инфа о салоне по id
*/
export const getAciveSalonByIdAction = (date) => ({
  type: GET_ACTIVE_SALON_BY_ID,
  payload: date
});
/** 
 * Запрос на получение информации о салоне по id
*/
export const getAciveSalonByIdThunk = (salonId) => async (dispatch, getState) => {
  try {
    fetch(`/api/v1/shops/${salonId}`)
      .then(req => req.json())
      .then(res => {
        // console.log('getAciveSalonByIdThunk res: ', res)
        dispatch(getAciveSalonByIdAction(res.data));
      })
  }
  catch {
    console.log('getAciveSalonByIdThunk: ', 'Что-то не получилось')
  }
}

/**
 * Устанавливаем id  активного салона 
 * (страница которого открыта на данный момент)
*/
export const setActiveSalonIdAction = (date) => ({
  type: SET_ACTIVE_SALON_ID,
  payload: date
});

export const changeActivePageForPaginationAction = (page) => ({
  type: CHANGE_ACTIVE_PAGE_FOR_PAGINATION,
  payload: page
});


export const incrementActivePagePaginationAction = (page) => ({
  type: INCREMENT_ACTIVE_PAGE_PAGINATION,
  payload: page
});

export const decrementActivePagePaginationAction = (page) => ({
  type: DECREMENT_ACTIVE_PAGE_PAGINATION,
  payload: page
});