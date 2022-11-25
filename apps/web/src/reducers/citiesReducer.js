import {
  GET_ALL_CITIES_SUCCESS,
  GET_ALL_CITIES
} from '../actions/citiesActions';

const initialStore = {
  cities: []
}

export default function citiesReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_ALL_CITIES: {
      return {
        ...store,
        cities: action.payload
      }
    }
    // case GET_ALL_CITIES_SUCCESS: {
    //   return {
    //     ...store,
    //     cities: [
    //       ...action.payload.rooms
    //     ]
    //   }
    // }
    default:
      return store;
  }
}