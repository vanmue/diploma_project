import {
  GET_GROUPS_SERVICES,
} from "../actions/servicesActions";

const initialStore = {
  groupsServices: [],
}

export default function salonsReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_GROUPS_SERVICES: {
      return {
        ...store,
        groupsServices: action.payload
      }
    }
    default:
      return store;
  }
}