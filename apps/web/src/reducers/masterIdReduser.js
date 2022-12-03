import {
  GET_MASTER_ID,
  SET_ACTIVE_MASTER_ID
} from '../actions/masterIdAction';

const initialStore = {
  id: null,
  salonId: null,
  dataMaster: null
}

export default function masterIdReducer(store = initialStore, action) {
  console.log(action)
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
        id: action.payload.masterId,
        salonId: action.payload.salonId,
      }
    }
    default:
      return store;
  }
}