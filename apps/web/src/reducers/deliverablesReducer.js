import {
  GET_ALL_DELIVERABLES,
  GET_ALL_SERVICE_GROUPS
} from "../actions/deliverablesActions";

const initialStore = {
  deliverables: null,
  serviceGroups: null
}

export default function deliverablesReducer(store = initialStore, action) {

  switch (action.type) {
    case GET_ALL_SERVICE_GROUPS: {
      return {
        ...store,
        serviceGroups: action.payload
      }
    }
    case GET_ALL_DELIVERABLES: {
      return {
        ...store,
        deliverables: action.payload
      }
    }
    default:
      return store;
  }
}