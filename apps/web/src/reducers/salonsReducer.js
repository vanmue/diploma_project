import {
  GET_ALL_SALONS,
  GET_ACTIVE_SALON_BY_ID,
  GET_FILTERING_SALONS,
  POST_NEW_SALON,
  SET_ACTIVE_SALON_ID,
  UPLOAD_IMAGE_FOR_SALON,
  POST_SET_ROLE_SHOP_MANAGER_START,
  POST_SET_ROLE_SHOP_MANAGER_SUCCESS,
  POST_SET_ROLE_SHOP_MANAGER_FAILURE,
  PATCH_DATA_SALON_START,
  PATCH_DATA_SALON_SUCCESS,
  PATCH_DATA_SALON_FAILURE,
} from "../actions/salonsAction";

const initialStore = {
  setRoleShopManagerData: {
    response: null,             // {string || null} -  
    isLoading: false,           // {boolean} -  состояние запроса
    error: null                 // {string || null} -  ошибка
  },
  patchDataSalonData: {
    response: null,             // {string || null} -  access_token
    isLoading: false,           // {boolean} -  состояние запроса
    error: null                 // {string || null} -  ошибка
  },
  salons: [],                   // {[] || [{}]} -  салоны
  pagination: null,             // {} || null} -  pagination
  activeSalonId: null,          // {number || null} - id салоны
  activeSalon: null,            // {{} || null} -  активный салон
  activePage: 1,                // {number} - page pagination
  imgForCarouselId: null,       // {{} || null} - картинка салоны
}

export default function salonsReducer(store = initialStore, action) {
  switch (action.type) {
    case POST_NEW_SALON: {
      return {
        ...store,
        activeSalon: action.payload
      }
    }
    case POST_SET_ROLE_SHOP_MANAGER_START: {
      return {
        ...store,
        setRoleShopManagerData: {
          ...store.setRoleShopManagerData,
          isLoading: true
        }
      }
    }
    case POST_SET_ROLE_SHOP_MANAGER_SUCCESS: {
      return {
        ...store,
        setRoleShopManagerData: {
          ...store.setRoleShopManagerData,
          response: action.payload,
          isLoading: false
        }
      }
    }
    case POST_SET_ROLE_SHOP_MANAGER_FAILURE: {
      return {
        ...store,
        setRoleShopManagerData: {
          ...store.setRoleShopManagerData,
          isLoading: false,
          error: action.payload,
        }
      }
    }

    case PATCH_DATA_SALON_START: {
      return {
        ...store,
        patchDataSalonData: {
          ...store.patchDataSalonData,
          isLoading: true,
        }
      }
    }
    case PATCH_DATA_SALON_SUCCESS: {
      return {
        ...store,
        patchDataSalonData: {
          ...store.patchDataSalonData,
          response: action.payload,
          isLoading: false,
        }
      }
    }
    case PATCH_DATA_SALON_FAILURE: {
      return {
        ...store,
        patchDataSalonData: {
          ...store.patchDataSalonData,
          isLoading: false,
          error: action.payload,
        }
      }
    }
    case UPLOAD_IMAGE_FOR_SALON: {
      return {
        ...store,
        imgForCarouselId: action.payload
      }
    }
    case GET_ALL_SALONS: {
      return {
        ...store,
        salons: action.payload
      }
    }
    case GET_FILTERING_SALONS: {
      return {
        ...store,
        salons: action.payload.date,
        pagination: action.payload.pagination,
      }
    }
    case SET_ACTIVE_SALON_ID: {
      return {
        ...store,
        activeSalonId: action.payload
      }
    }
    case GET_ACTIVE_SALON_BY_ID: {
      return {
        ...store,
        activeSalon: action.payload
      }
    }
    default:
      return store;
  }
}