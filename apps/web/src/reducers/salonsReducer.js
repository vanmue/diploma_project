import {
  GET_ALL_SALONS,
  GET_ACTIVE_SALON_BY_ID,
  // GET_MASTERS_OF_ACTIVE_SALON,
  GET_FILTERING_SALONS,
  SET_ACTIVE_SALON_ID,
  CHANGE_ACTIVE_PAGE_FOR_PAGINATION,
  INCREMENT_ACTIVE_PAGE_PAGINATION,
  DECREMENT_ACTIVE_PAGE_PAGINATION,
} from "../actions/salonsAction";

const initialStore = {
  salons: [],
  activeSalonId: null,
  activeSalon: null,
  activePage: 1,
}

export default function salonsReducer(store = initialStore, action) {
  switch (action.type) {
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
    // case GET_MASTERS_OF_ACTIVE_SALON: {
    //   // console.log('GET_MASTERS_OF_ACTIVE_SALON action.payload: ', action.payload)
    //   return {
    //     ...store,
    //     mastersActiveSalon: action.payload
    //   }
    // }
    case CHANGE_ACTIVE_PAGE_FOR_PAGINATION: {
      return {
        ...store,
        activePage: action.payload
      }
    }
    case INCREMENT_ACTIVE_PAGE_PAGINATION: {
      return {
        ...store,
        activePage: ++action.payload
      }
    }
    case DECREMENT_ACTIVE_PAGE_PAGINATION: {
      return {
        ...store,
        activePage: --action.payload
      }
    }
    default:
      return store;
  }
}