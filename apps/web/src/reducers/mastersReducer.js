import {
  GET_ALL_MASTERS,
  GET_FILTERING_MASTERS,
  GET_ALL_MASTERS_FOR_ACTIVE_SALON
} from "../actions/mastersActions";
// import {
//   CHANGE_ACTIVE_PAGE_FOR_PAGINATION,
// } from "../actions/salonsAction";

const initialStore = {
  masters: [],
  activePageMasters: 1,
  mastersActiveSalon: null,
  activePageMastersActiveSalon: 1,
}

export default function mastersReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_FILTERING_MASTERS: {
      return {
        ...store,
        masters: action.payload
      }
    }
    case GET_ALL_MASTERS_FOR_ACTIVE_SALON: {
      return {
        ...store,
        mastersActiveSalon: action.payload
      }
    }
    default:
      return store;
  }
}