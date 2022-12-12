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
export const PATCH_SALON = '@@salons/PATCH_SALON';
export const POST_IMAGE_FOR_SALON = '@@salons/POST_IMAGE_FOR_SALON';
export const UPLOAD_IMAGE_FOR_SALON = '@@salons/UPLOAD_IMAGE_FOR_SALON';

export const POST_SET_ROLE_SHOP_MANAGER_START = '@@salons/POST_SET_ROLE_SHOP_MANAGER_START';
export const POST_SET_ROLE_SHOP_MANAGER_SUCCESS = '@@salons/POST_SET_ROLE_SHOP_MANAGER_SUCCESS';
export const POST_SET_ROLE_SHOP_MANAGER_FAILURE = '@@salons/POST_SET_ROLE_SHOP_MANAGER_FAILURE';

export const PATCH_DATA_SALON_START = '@@salons/PATCH_DATA_SALON_START';
export const PATCH_DATA_SALON_SUCCESS = '@@salons/PATCH_DATA_SALON_SUCCESS';
export const PATCH_DATA_SALON_FAILURE = '@@salons/PATCH_DATA_SALON_FAILURE';

// export const GET_ME_PROFILES_START = '@@salons/GET_ME_PROFILES_START';
// export const GET_ME_PROFILES_SUCCESS = '@@salons/GET_ME_PROFILES_SUCCESS';
// export const GET_ME_PROFILES_FAILURE = '@@salons/GET_ME_PROFILES_FAILURE';
// // export const CHANGE_ARRAY_PAGINATION = '@@salons/CHANGE_ARRAY_PAGINATION';

let token = localStorage.getItem("access_token");

// /**
//  * Получение списка всех типов профилей
// */
// /******************************************************************/
// /**
//  * Начало GET запроса
// */
// export const getMeProfilesStartAction = (date) => ({
//   type: GET_ME_PROFILES_START,
//   payload: date
// });
// /**
//  * Успешное выполнение GET запроса
// */
// export const getMeProfilesSuccessAction = (date) => ({
//   type: GET_ME_PROFILES_SUCCESS,
//   payload: date
// });
// /**
//  * Завершение с ошибкой GET
// */
// export const getMeProfilesFailureAction = (date) => ({
//   type: GET_ME_PROFILES_FAILURE,
//   payload: date
// });

// /** 
//  * GET запрос на получение списка всех типов профилей
//  * @param {} date -  
// */
// export const getMeProfilesThunk = (data) => async (dispatch, getState) => {

//   dispatch(getMeProfilesStartAction());

//   fetch("/api/v1/me/profiles", {
//     method: "GET",
//     headers: {
//       'Authorization': `Bearer ${token}`
//     },
//   })
//     .then(req => req.json())
//     .then(res => {
//       console.log('getMeProfilesThunk res:', res);

//       // let profileSM = res.data.find(el => el.profile_type == "shop_manager").entity_id//el.entity_id
//       // console.log('getMeProfilesThunk profileSM:', profileSM);
//       dispatch(getMeProfilesSuccessAction(res.data));

//     })
//     .catch(err => {
//       console.log('getMeProfilesThunk err: ', err);

//       dispatch(getMeProfilesFailureAction(err));
//     });
// }


/**
 * PATCH запрос на изменение информации о салоне
*/
/******************************************************************/
/**
 * Начало PATCH запроса
*/
export const patchDataSalonStartAction = (date) => ({
  type: PATCH_DATA_SALON_START,
  payload: date
});
/**
 * Успешное выполнение PATCH запроса
*/
export const patchDataSalonSuccessAction = (date) => ({
  type: PATCH_DATA_SALON_SUCCESS,
  payload: date
});
/**
 * Завершение с ошибкой PATCH
*/
export const patchDataSalonFailureAction = (date) => ({
  type: PATCH_DATA_SALON_FAILURE,
  payload: date
});

/** 
 * PATCH запрос. Измением информацио о салоне
 * @param {{
 * name: {string},
 * address: {string},
 * cityId: {number},
 * phone: {string},
 * working_time: {string},
 * working_start: {number},
 * working_end: {number},
 * advantages: [{number}],
 * center_latitude: {number},
 * center_longtitude: {number},
 * label_latitude: {number},
 * label_longtitude: {number},
 * zoom: {number},
 * }} date -  объект салона
*/
export const patchDataSalonThunk = (data) => async (dispatch, getState) => {

  dispatch(patchDataSalonStartAction());

  fetch(`/api/v1/shops/${data.salonId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data.salon)
  })
    .then(req => req.json())
    .then(res => {
      console.log('patchDataSalonThunk res:', res);
      dispatch(patchDataSalonSuccessAction(res.data));

    })
    .catch(err => {
      console.log('patchDataSalonThunk: ', err);
      dispatch(patchDataSalonFailureAction(err));
    });
}

/**
 * POST запрос на установку user-у роли "shop_manager"
*/
/******************************************************************/
/**
 * Начало POST запроса на установку роли "shop_manager"
*/
export const postSetRoleShopManagerStartAction = (date) => ({
  type: POST_SET_ROLE_SHOP_MANAGER_START,
  payload: date
});
/**
 * Успешное выполнение POST запроса на установку роли "shop_manager"
*/
export const postSetRoleShopManagerSuccessAction = (date) => ({
  type: POST_SET_ROLE_SHOP_MANAGER_SUCCESS,
  payload: date
});
/**
 * Завершение с ошибкой POST запроса на установку роли "shop_manager"
*/
export const postSetRoleShopManagerFailureAction = (date) => ({
  type: POST_SET_ROLE_SHOP_MANAGER_FAILURE,
  payload: date
});

/** 
 * POST запрос. Устанавливаем роль
 * @param {{}} date -  {profile_type: "master", userId: 91 }
*/
export const postSetRoleShopManagerThunk = (data) => async (dispatch, getState) => {

  dispatch(postSetRoleShopManagerStartAction());

  fetch("/api/v1/profiles", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
    // body: JSON.stringify({ userId: +data, profile_type: "shop_manager" })
  })
    .then(req => req.json())
    .then(res => {
      console.log('postSetRoleShopManagerSuccessAction res:', res);
      dispatch(postSetRoleShopManagerSuccessAction(res.data));

    })
    .catch(err => {
      console.log('postSetRoleShopManagerFailureAction: ', err);
      dispatch(postSetRoleShopManagerFailureAction(err));
    });
}

/**
 * Создание салоан
*/
/******************************************************************/
/**
 * @param {{}} date - данные нового салона
*/
export const postNewSalonAction = (date) => ({
  type: POST_NEW_SALON,
  payload: date
});
/** 
 * POST запрос на создание нового салона
 * @param {{}} date - данные нового салона
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
      dispatch(postNewSalonAction(res.data));
    })
    .catch(err => console.log('postNewSalonThunk: ', err));
}










/******************************************************************/
// /**
//  * @param {{}} date - 
// */
// export const patchSalonAction = (date) => ({
//   type: PATCH_SALON,
//   payload: date
// });
// /** 
//  * Запрос на создание нового салона
//  * @param {{}} date - данные нового салона
// */
// export const patchSalonThunk = (data) => async (dispatch, getState) => {

//   fetch('/api/v1/shops', {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(req => req.json())
//     .then(res => {
//       console.log('patchSalonThunk res:', res);
//       // dispatch(patchSalonAction(res.data));
//     })
//     .catch(err => console.log('patchSalonThunk: ', err));
// }

















/**
 * Загрузка картинки для салона,
 * получение id файла
*/
/******************************************************************/
/**
 * @param {number} date - id картинки
*/
export const uploadImageForSalonAction = (date) => ({
  type: UPLOAD_IMAGE_FOR_SALON,
  payload: date
});
/** 
 * Загрузка картинки для салона в поле images
 * с ЦЕЛЬЮ получения её id
 * @param {object} date - картинка
*/
export const uploadImageForSalonThunk = (data) => async (dispatch, getState) => {

  let formData = new FormData;
  formData.append('file', data.file);

  fetch('/api/v1/files', {
    method: 'POST',
    body: formData
  })
    .then(req => req.json())
    .then(res => {
      console.log('uploadImageForSalonThunk res:', res.data.id);
      dispatch(uploadImageForSalonAction(res.data.id));
    })
    .catch(console.log('uploadImageForSalonThunk: ', 'Что-то не получилось'));
}

/**
 * Отправка объекта с id добавляемой картинки
*/
/******************************************************************/
/**
 * @param {number} date - картинка
*/
export const postImageForSalonAction = (date) => ({
  type: POST_IMAGE_FOR_SALON,
  payload: date
});
/** 
 * Отправка картинки для салона в поле images
 * @param {{}} date - картинка
*/
export const postImageForSalonThunk = (data) => async (dispatch, getState) => {
  // console.log('postImageForSalonThunk res:', data);

  fetch('/api/v1/shop-images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(req => req.json())
    .then(res => {
      console.log('postImageForSalonThunk res:', res);
      // dispatch(postImageForSalonAction(res));
    })
    .catch(console.log('postImageForSalonThunk: ', 'Что-то не получилось'));
}

/**
 * Получение массива всех салонов
*/
/******************************************************************/
/**
 * @param {[{}]} date - салоны
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
    .catch(err => console.log('getAllSalonsThunk: ', err));
}

/**
 * Получение массива отфильрованных салонов
*/
/******************************************************************/
/**
 * @param {[{}]} date - салоны
*/
export const getSalonsAction = (date, pagination) => ({
  type: GET_FILTERING_SALONS,
  payload: {
    date,
    pagination
  }
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
      dispatch(getSalonsAction(res.data, res.pagination));
    })
    .catch(err => console.log('getFilteringSalonsThunk: ', err));
}

/**
 * Получение информации о салоне по его id
*/
/******************************************************************/
/**
 * @param {object} date - Инфа о салоне
*/
export const getAciveSalonByIdAction = (date) => ({
  type: GET_ACTIVE_SALON_BY_ID,
  payload: date
});
/** 
 * Запрос на получение информации о салоне по id
 * @param {number} salonId - id салона
*/
export const getAciveSalonByIdThunk = (salonId) => async (dispatch, getState) => {
  fetch(`/api/v1/shops/${salonId}`)
    .then(req => req.json())
    .then(res => {
      //console.log('getAciveSalonByIdThunk res: ', res)
      dispatch(getAciveSalonByIdAction(res.data));
    })
    .catch(err => console.log('getAciveSalonByIdThunk: ', err))
}

/******************************************************************/
/**
 * Устанавливаем id  активного салона 
 * (страница которого открыта на данный момент)
 * @param {number} date - id салона
*/
export const setActiveSalonIdAction = (date) => ({
  type: SET_ACTIVE_SALON_ID,
  payload: date
});

/******************************************************************/
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