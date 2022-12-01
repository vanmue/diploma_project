import {
  GET_ALL_CITIES
} from '../actions/citiesActions';

const initialStore = {
  cities: null
}

export default function citiesReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_ALL_CITIES: {
      return {
        ...store,
        cities: action.payload
      }
    }
    default:
      return store;
  }
}