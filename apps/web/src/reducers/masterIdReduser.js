import {
  GET_MASTER_ID,
  SET_ACTIVE_MASTER_ID
} from '../actions/masterIdAction';

const initialStore = {
  id: 7,
  dataMaster: null
}

export default function masterIdReducer(store = initialStore, action) {

  switch (action.type) {
    case GET_MASTER_ID: {
      return {
        ...store,
        dataMaster: action.payload
      }
    }
    case SET_ACTIVE_MASTER_ID: {
      return {
        ...store,
        id: action.payload
      }
    }
    default:
      return store;
  }
}