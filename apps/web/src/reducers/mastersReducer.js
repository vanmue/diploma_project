import {
  GET_ALL_MASTERS,
  GET_FILTERING_MASTERS,
  GET_ALL_MASTERS_FOR_ACTIVE_SALON,
  POST_IMAGE_FOR_MASTER
} from "../actions/mastersActions";

const initialStore = {
  masters: [],                      // {[]} - все мастера
  activePageMasters: 1,             // {number} - страница пагинации мастеров на странице мастеров
  mastersActiveSalon: null,         // {[{}]} - мастера активного салона
  activePageMastersActiveSalon: 1,  // {number} - страница пагинации для мастеров в активном салоне
  imgForFaceMasterId: null,         // {number} - id картинки для лица мастера
}

export default function mastersReducer(store = initialStore, action) {
  switch (action.type) {
    case POST_IMAGE_FOR_MASTER: {
      console.log('POST_IMAGE_FOR_MASTER action.payload', action.payload)
      return {
        ...store,
        imgForFaceMasterId: action.payload
      }
    }
    case GET_FILTERING_MASTERS: {
      return {
        ...store,
        masters: action.payload
      }
    }
    case GET_ALL_MASTERS_FOR_ACTIVE_SALON: {
      return {
        ...store,
        mastersActiveSalon: action.payload
      }
    }
    default:
      return store;
  }
}