import { GET_CITIES, GET_CITY_BY_ID } from '../actions/constants';

const initialStore = {
  getCities: {
    data: null,
    isLoading: false,
    error: null
  },
  getCity: {
    data: null,
    isLoading: false,
    error: null
  },
}

export default function citiesReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_CITIES.START: {
      return {
        ...store,
        getCities: {
          ...store.getCities,
          isLoading: true
        }
      }
    }
    case GET_CITIES.SUCCESS: {
      return {
        ...store,
        getCities: {
          ...store.getCities,
          data: action.payload,
          isLoading: false
        }
      }
    }
    case GET_CITIES.FAILURE: {
      return {
        ...store,
        getCities: {
          ...store.getCities,
          isLoading: false,
          error: action.payload
        }
      }
    }
    case GET_CITY_BY_ID.START: {
      return {
        ...store,
        getCity: {
          ...store.getCity,
          isLoading: true
        }
      }
    }
    case GET_CITY_BY_ID.SUCCESS: {
      return {
        ...store,
        getCity: {
          ...store.getCity,
          data: action.payload,
          isLoading: false
        }
      }
    }
    case GET_CITY_BY_ID.SUCCESS: {
      return {
        ...store,
        getCity: {
          ...store.getCity,
          isLoading: false,
          error: action.payload
        }
      }
    }
    default:
      return store;
  }
}