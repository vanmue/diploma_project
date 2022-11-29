import {
  GET_ALL_MASTERS,
  GET_FILTERING_MASTERS,
  GET_ALL_MASTERS_FOR_ACTIVE_SALON,
  POST_IMAGE_FOR_MASTER
} from "../actions/mastersActions";

const initialStore = {
  masters: [],
  activePageMasters: 1,
  mastersActiveSalon: null,
  activePageMastersActiveSalon: 1,
  imageIdForAddMaster: null
}

export default function mastersReducer(store = initialStore, action) {
  switch (action.type) {
    case POST_IMAGE_FOR_MASTER: {
      return {
        ...store,
        imageIdForAddMaster: action.payload
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