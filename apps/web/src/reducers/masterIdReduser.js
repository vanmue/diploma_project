import {
  GET_MASTER_ID,
  SET_ACTIVE_MASTER_ID,
  GET_MASTER_ID_CARD,
  GET_MASTER_ID_LK
} from '../actions/masterIdAction';

const initialStore = {
  id: null,
  salonId: null,
  dataMaster: null,
  dataMasterCard: null,
}

export default function masterIdReducer(store = initialStore, action) {
  switch (action.type) {

    case GET_MASTER_ID_LK: {
      return {
        ...store,
        dataMaster: action.payload
      }
    }
    case GET_MASTER_ID_CARD: {
      return {
        ...store,
        dataMasterCard: action.payload
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