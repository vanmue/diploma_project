import {
  GET_ALL_DELIVERABLES,
  GET_ALL_SERVICE_GROUPS
} from "../actions/deliverablesActions";

const initialStore = {
  deliverables: null,
  serviceGroups: [{}]
}

export default function deliverablesReducer(store = initialStore, action) {

  switch (action.type) {
    case GET_ALL_SERVICE_GROUPS: {
      // console.log("deliverablesReducer GET_ALL_SERVICE_GROUPS:", action.payload)
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