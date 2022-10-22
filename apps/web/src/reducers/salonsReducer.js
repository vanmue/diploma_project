import { CHANGE_ACTIVE_PAGE_FOR_PAGINATION } from "../actions/salonsAction";
import { CHANGE_ARRAY_PAGINATION } from "../actions/salonsAction";

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
    // case CHANGE_ARRAY_PAGINATION: {
    //   let arr = store.arrPagination;
    //   arr.push(action.payload);
    //   return {
    //     ...store,
    //     arrPagination: arr
    //   }
    // }
    default:
      return store;
  }
}