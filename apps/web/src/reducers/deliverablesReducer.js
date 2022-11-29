import { GET_ALL_DELIVERABLES } from "../actions/deliverablesActions";

const initialStore = {
  deliverables: null
}

export default function deliverablesReducer(store = initialStore, action) {

  switch (action.type) {
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