import {
  GET_ALL_MASTERS,
  GET_FILTERING_MASTERS,
  GET_ALL_MASTERS_FOR_ACTIVE_SALON,
  POST_IMAGE_FOR_MASTER,
  POST_SET_ROLE_MASTER,
  DELETE_MASTER_START,
  DELETE_MASTER_SUCCESS,
  DELETE_MASTER_FAILURE,
} from "../actions/mastersActions";

const initialStore = {
  masters: [],                      // {[]} - все мастера
  activePageMasters: 1,             // {number} - страница пагинации мастеров на странице мастеров
  mastersActiveSalon: null,         // {[{}]} - мастера активного салона
  activePageMastersActiveSalon: 1,  // {number} - страница пагинации для мастеров в активном салоне
  imgForFaceMasterId: null,         // {number} - id картинки для лица мастера
  responsePostSetRoleMaster: null,  // {object} - ответ на POST запрос установки роли master для user
  pagination: null,
  deleteMaster: {
    response: null,              // {string || null} -  access_token
    isLoading: false,           // {boolean} -  состояние запроса
    error: null                 // {string || null} -  ошибка
  },
}

export default function mastersReducer(store = initialStore, action) {
  switch (action.type) {
    case DELETE_MASTER_START: {
      return {
        ...store,
        deleteMaster: {
          ...store.deleteMaster,
          isLoading: true
        }
      }
    }
    case DELETE_MASTER_SUCCESS: {
      return {
        ...store,
        deleteMaster: {
          ...store.deleteMaster,
          response: action.payload,
          isLoading: false
        }
      }
    }
    case DELETE_MASTER_FAILURE: {
      return {
        ...store,
        deleteMaster: {
          ...store.deleteMaster,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case POST_SET_ROLE_MASTER: {
      return {
        ...store,
        responsePostSetRoleMaster: action.payload
      }
    }
    case POST_IMAGE_FOR_MASTER: {
      return {
        ...store,
        imgForFaceMasterId: action.payload
      }
    }
    case GET_FILTERING_MASTERS: {
      // console.log("GET_FILTERING_MASTERS action.payload.date", action.payload.date)
      // console.log("GET_FILTERING_MASTERS action.payload.pagination", action.payload.pagination)
      return {
        ...store,
        masters: action.payload.date,
        pagination: action.payload.pagination,
      }
    }
    case GET_ALL_MASTERS_FOR_ACTIVE_SALON: {
      return {
        ...store,
        mastersActiveSalon: action.payload.data,
        pagination: action.payload.pagination,
      }
    }
    default:
      return store;
  }
}