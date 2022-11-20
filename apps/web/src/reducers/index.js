import { combineReducers } from "redux";
import citiesReducer from './citiesReducer';
import stylesReducer from "./stylesReducer";
import salonsReducer from "./salonsReducer";
import masterIdReducer from './masterIdReduser'

export default combineReducers({
  salonsReducer,
  citiesReducer,
  stylesReducer,
  masterIdReducer
});