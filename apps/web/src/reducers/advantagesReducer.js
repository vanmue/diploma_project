import { GET_ADVANTAGES } from "../actions/constants";

const initialStore = {
  getShopAdvantages: {
    data: null,
    isLoading: false,
    error: null
  },
}

export default function advantagesReducer(store = initialStore, action) {
  switch (action.type) {
    case GET_ADVANTAGES.START: {
      return {
        ...store,
        getShopAdvantages: {
          ...store.getShopAdvantages,
          isLoading: true
        }
      }
    }
    case GET_ADVANTAGES.SUCCESS: {
      return {
        ...store,
        getShopAdvantages: {
          ...store.getShopAdvantages,
          data: action.payload,
          isLoading: false
        }
      }
    }
    case GET_ADVANTAGES.FAILURE: {
      return {
        ...store,
        getShopAdvantages: {
          ...store.getShopAdvantages,
          isLoading: false,
          error: action.payload
        }
      }
    }
    default:
      return store;
  }
}