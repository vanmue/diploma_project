import {
  GET_ALL_CITIES,
  GE_CITIES_BY_ID
} from '../actions/citiesActions';

const initialStore = {
  cities: null,
  city: null
}

export default function citiesReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_ALL_CITIES: {
      return {
        ...store,
        cities: action.payload
      }
    }
    case GE_CITIES_BY_ID: {
      return {
        ...store,
        city: action.payload
      }
    }
    default:
      return store;
  }
}