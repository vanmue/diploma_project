import { combineReducers } from "redux";
import citiesReducer from './citiesReducer';
import stylesReducer from "./stylesReducer";
import salonsReducer from "./salonsReducer";
import masterIdReducer from './masterIdReduser';
import mastersReducer from "./mastersReducer";
import masterRecordReducer from './masterRecordReduser'

export default combineReducers({
  citiesReducer,
  salonsReducer,
  mastersReducer,
  stylesReducer,
  masterIdReducer,
  masterRecordReducer
});