import { GET_ALL_CITIES_SUCCESS } from '../actions/citiesActions';

const initialStore = {
  cities: [
    'Выберите город',
    'Москва',
    'Питер',
    'Екатеренбург',
    'Самара',
    'Воронеж'
  ]
}

export default function citiesReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_ALL_CITIES_SUCCESS: {
      return {
        ...store,
        cities: [
          ...action.payload.rooms
        ]
      }
    }
    default:
      return store;
  }
}