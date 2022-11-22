export const GET_CITIES = '@@salons/GET_CITIES';
export const GET_GROUPS_SERVICES = '@@salons/GET_GROUPS_SERVICES';
export const GET_SALONS = '@@salons/GET_SALONS';
export const SET_ACTIVE_SALON_ID = '@@salons/SET_ACTIVE_SALON_ID';
export const GET_FILTERING_SALONS = '@@salons/GET_FILTERING_SALONS';
export const GET_FILTERING_SALONS_BY_CITY = '@@salons/GET_FILTERING_SALONS_BY_CITY';
export const CHANGE_ACTIVE_PAGE_FOR_PAGINATION = '@@salons/CHANGE_ACTIVE_PAGE_FOR_PAGINATION';
export const INCREMENT_ACTIVE_PAGE_PAGINATION = '@@salons/INCREMENT_ACTIVE_PAGE_PAGINATION';
export const DECREMENT_ACTIVE_PAGE_PAGINATION = '@@salons/DECREMENT_ACTIVE_PAGE_PAGINATION';
// export const CHANGE_ARRAY_PAGINATION = '@@salons/CHANGE_ARRAY_PAGINATION';

export const getCitiesAction = (date) => ({
  type: GET_CITIES,
  payload: date
});

export const getServicesGroupsAction = (date) => ({
  type: GET_GROUPS_SERVICES,
  payload: date
});

export const getSalonsAction = (date) => ({
  type: GET_SALONS,
  payload: date
});

export const setActiveSalonIdAction = (date) => ({
  type: SET_ACTIVE_SALON_ID,
  payload: date
});

export const getFilteringSalonsAction = (date) => ({
  type: GET_FILTERING_SALONS,
  payload: date
});

export const getFilteringSalonsByCityAction = (date) => ({
  type: GET_FILTERING_SALONS_BY_CITY,
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

export const getCitiesThunk = () => async (dispatch, getState) => {
  try {
    fetch('/api/v1/cities')
      .then(req => req.json())
      .then(res => {
        // console.log('getCitiesThunk: ', res)
        dispatch(getCitiesAction(res.data));
      })
  }
  catch {
    console.log('getCitiesThunk: ', 'Что-то не получилось')
  }
}

export const getServicesGroupsThunk = () => async (dispatch, getState) => {
  try {
    fetch('/api/v1/deliverable-groups')
      .then(req => req.json())
      .then(res => {
        // console.log('getServicesGroupsThunk: ', res)
        dispatch(getServicesGroupsAction(res.data));
      })
  }
  catch {
    console.log('getCitiesThunk: ', 'Что-то не получилось')
  }
}

export const getSalonsThunk = () => async (dispatch, getState) => {
  try {
    fetch('/api/v1/shops')
      .then(req => req.json())
      .then(res => {
        dispatch(getSalonsAction(res.data));
      })
  }
  catch {
    console.log('getSalonsThunk: ', 'Что-то не получилось')
  }
}

export const getFilteringSalonsThunk = (cityId = null, serviceId = null) => async (dispatch, getState) => {
  // city_id=${cityId}
  // &deliverable_group_id=${serviceId}
  let adress = `/api/v1/shops/?city_id=${cityId}&deliverable_group_id=${serviceId}`;
  // console.log('getFilteringSalonsThunk adress:', adress)
  try {
    fetch(adress)
      .then(req => req.json())
      .then(res => {
        dispatch(getSalonsAction(res.data));
      })
  }
  catch {
    console.log('getSalonsThunk: ', 'Что-то не получилось')
  }
}

export const getFilteringSalonsByCityThunk = (cityId) => async (dispatch, getState) => {
  try {
    fetch(`/api/v1/shops/?city_id=${cityId}`)
      .then(req => req.json())
      .then(res => {
        // console.log('getFilteringSalonsByCityThunk res.data: ', res.data)
        dispatch(getFilteringSalonsByCityAction(res.data));
      })
  }
  catch {
    console.log('getFilteringSalonsByCityThunk: ', 'Что-то не получилось')
  }
}