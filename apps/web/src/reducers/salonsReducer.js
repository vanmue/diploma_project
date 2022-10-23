import {
  CHANGE_ACTIVE_PAGE_FOR_PAGINATION,
  INCREMENT_ACTIVE_PAGE_PAGINATION,
  DECREMENT_ACTIVE_PAGE_PAGINATION,
} from "../actions/salonsAction";

const initialStore = {
  activePage: 9,
  arrPagination: []
}

export default function salonsReducer(store = initialStore, action) {
  switch (action.type) {
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