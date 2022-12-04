import {
  GET_ALL_SALONS,
  GET_ACTIVE_SALON_BY_ID,
  GET_FILTERING_SALONS,
  POST_NEW_SALON,
  SET_ACTIVE_SALON_ID,
  UPLOAD_IMAGE_FOR_SALON,
  // CHANGE_ACTIVE_PAGE_FOR_PAGINATION,
  // INCREMENT_ACTIVE_PAGE_PAGINATION,
  // DECREMENT_ACTIVE_PAGE_PAGINATION,
} from "../actions/salonsAction";

const initialStore = {
  salons: [],
  pagination: null,
  activeSalonId: 3,
  // activeSalonId: null,
  activeSalon: null,
  activePage: 1,
  imgForCarouselId: null,
}

export default function salonsReducer(store = initialStore, action) {
  switch (action.type) {
    case UPLOAD_IMAGE_FOR_SALON: {
      return {
        ...store,
        imgForCarouselId: action.payload
      }
    }
    case POST_NEW_SALON: {
      return {
        ...store,
        activeSalon: action.payload
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