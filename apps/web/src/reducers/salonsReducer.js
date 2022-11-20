import {
  GET_CITIES,
  GET_SALONS,
  GET_FILTERING_SALONS_BY_CITY,
  CHANGE_ACTIVE_PAGE_FOR_PAGINATION,
  INCREMENT_ACTIVE_PAGE_PAGINATION,
  DECREMENT_ACTIVE_PAGE_PAGINATION,
} from "../actions/salonsAction";

const initialStore = {
  cities: [],
  salons: [],
  activePage: 9,
}

export default function salonsReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_CITIES: {
      return {
        ...store,
        cities: action.payload
      }
    }
    case GET_SALONS: {
      return {
        ...store,
        salons: action.payload
      }
    }
    case GET_FILTERING_SALONS_BY_CITY: {
      return {
        ...store,
        salons: action.payload
      }
    }
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