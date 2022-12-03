import {
  GET_ALL_SALONS,
  GET_ACTIVE_SALON_BY_ID,
  GET_FILTERING_SALONS,
  POST_NEW_SALON,
  SET_ACTIVE_SALON_ID,
  // CHANGE_ACTIVE_PAGE_FOR_PAGINATION,
  // INCREMENT_ACTIVE_PAGE_PAGINATION,
  // DECREMENT_ACTIVE_PAGE_PAGINATION,
} from "../actions/salonsAction";

const initialStore = {
  salons: [],
  activeSalonId: 4,
  // activeSalonId: null,
  activeSalon: null,
  activePage: 1,
}

export default function salonsReducer(store = initialStore, action) {
  switch (action.type) {
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
      return {
        ...store,
        salons: action.payload
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