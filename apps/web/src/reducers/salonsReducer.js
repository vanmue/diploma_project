import {
  GET_GROUPS_SERVICES,
  GET_SALONS,
  GET_ACTIVE_SALON_BY_ID,
  // GET_MASTERS_OF_ACTIVE_SALON,
  GET_FILTERING_SALONS,
  SET_ACTIVE_SALON_ID,
  GET_FILTERING_SALONS_BY_CITY,
  CHANGE_ACTIVE_PAGE_FOR_PAGINATION,
  INCREMENT_ACTIVE_PAGE_PAGINATION,
  DECREMENT_ACTIVE_PAGE_PAGINATION,
} from "../actions/salonsAction";

const initialStore = {
  groupsServices: [],
  salons: [],
  activeSalonId: null,
  activeSalon: null,
  // mastersActiveSalon: null,
  activePage: 1,
}

export default function salonsReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_GROUPS_SERVICES: {
      return {
        ...store,
        groupsServices: action.payload
      }
    }
    case GET_SALONS: {
      return {
        ...store,
        salons: action.payload
      }
    }
    case SET_ACTIVE_SALON_ID: {
      // console.log('SET_ACTIVE_SALON_ID action.payload: ', action.payload)
      return {
        ...store,
        activeSalonId: action.payload
      }
    }
    case GET_ACTIVE_SALON_BY_ID: {
      // console.log('GET_ACTIVE_SALON_BY_ID action.payload: ', action.payload)
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
    // case GET_FILTERING_SALONS: {
    //   return {
    //     ...store,
    //     salons: action.payload
    //   }
    // }
    // case GET_FILTERING_SALONS_BY_CITY: {
    //   return {
    //     ...store,
    //     salons: action.payload
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