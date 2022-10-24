import { combineReducers } from "redux";
import citiesReducer from './citiesReducer';
import stylesReducer from "./stylesReducer";
import salonsReducer from "./salonsReducer";

export default combineReducers({
  salonsReducer,
  citiesReducer,
  stylesReducer
});