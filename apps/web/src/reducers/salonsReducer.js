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
  GET_ME_PROFILES_START,
  GET_ME_PROFILES_SUCCESS,
  GET_ME_PROFILES_FAILURE,
  // CHANGE_ACTIVE_PAGE_FOR_PAGINATION,
  // INCREMENT_ACTIVE_PAGE_PAGINATION,
  // DECREMENT_ACTIVE_PAGE_PAGINATION,
} from "../actions/salonsAction";

const initialStore = {
  getMeProfilesData: {
    response: null,             // {string || null} -  
    isLoading: false,           // {boolean} -  состояние запроса
    error: null                 // {string || null} -  ошибка
  },
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
  salons: [],
  pagination: null,
  activeSalonId: null,
  activeSalon: null,
  activePage: 1,
  imgForCarouselId: null,
}

export default function salonsReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_ME_PROFILES_START: {
      return {
        ...store,
        getMeProfilesData: {
          ...store.getMeProfilesData,
          isLoading: true
        }
      }
    }
    case GET_ME_PROFILES_SUCCESS: {
      // let salonId = action.payload.find(el => el.profile_type == "shop_manager").entity_id;
      // localStorage.setItem("activeSalonId", JSON.stringify(salonId))
      return {
        ...store,
        // activeSalonId: salonId,
        getMeProfilesData: {
          ...store.getMeProfilesData,
          response: action.payload,
          isLoading: false
        }
      }
    }
    case GET_ME_PROFILES_FAILURE: {
      return {
        ...store,
        getMeProfilesData: {
          ...store.getMeProfilesData,
          isLoading: false,
          error: action.payload
        }
      }
    }
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
      // console.log("GET_FILTERING_SALONS action.payload.date", action.payload.date)
      // console.log("GET_FILTERING_SALONS action.payload.pagination", action.payload.pagination)
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
    // case CHANGE_ACTIVE_PAGE_FOR_PAGINATION: {
    //   return {
    //     ...store,
    //     activePage: action.payload
    //   }
    // }
    // case INCREMENT_ACTIVE_PAGE_PAGINATION: {
    //   return {
    //     ...store,
    //     activePage: ++action.payload
    //   }
    // }
    // case DECREMENT_ACTIVE_PAGE_PAGINATION: {
    //   return {
    //     ...store,
    //     activePage: --action.payload
    //   }
    // }
    default:
      return store;
  }
}