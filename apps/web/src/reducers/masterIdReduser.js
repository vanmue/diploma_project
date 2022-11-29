import {
  GET_MASTER_ID,
  SET_ACTIVE_MASTER_ID
} from '../actions/masterIdAction';

const initialStore = {
  id: 7,
  salonId: null,
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
      console.log('SET_ACTIVE_MASTER_ID action.payload.masterId', action.payload.masterId)
      console.log('SET_ACTIVE_MASTER_ID action.payload.salonId', action.payload.salonId)
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