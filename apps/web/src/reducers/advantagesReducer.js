import {
  GET_ALL_ADVANTAGES
} from '../actions/advantagesActions';

const initialStore = {
  advantages: null
}

export default function advantagesReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_ALL_ADVANTAGES: {
      return {
        ...store,
        advantages: action.payload
      }
    }
    default:
      return store;
  }
}