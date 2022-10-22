import { HEADER_BACKGROUND_CHANGING } from "../actions/stylesActions";
import { PAGE_NAVIGATION_COLOR_CHANGING } from "../actions/stylesActions";
import { HEADER_LABEL_CHANGING } from "../actions/stylesActions";

export const initialStore = {
  header: {
    background: '#F5BFAB',
    isMain: true
  },
  navigation: {
    color: '#FFFFFF'
  }
}

export default function stylesReducer(store = initialStore, action) {
  switch (action.type) {
    case HEADER_BACKGROUND_CHANGING: {
      return {
        ...store,
        header: {
          ...store.header,
          background: action.payload
        }
      }
    }
    case PAGE_NAVIGATION_COLOR_CHANGING: {
      return {
        ...store,
        navigation: {
          ...store.navigation,
          color: action.payload
        }
      }
    }
    case HEADER_LABEL_CHANGING: {
      return {
        ...store,
        header: {
          ...store.header,
          isMain: action.payload
        }
      }
    }
    default:
      return store;
  }
}