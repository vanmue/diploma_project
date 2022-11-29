import { combineReducers } from "redux";
import citiesReducer from './citiesReducer';
import stylesReducer from "./stylesReducer";
import salonsReducer from "./salonsReducer";
import masterIdReducer from './masterIdReduser';
import mastersReducer from "./mastersReducer";
import servicesReducer from "./servicesReducer";
import masterRecordReducer from './masterRecordReduser';
import advantagesReducer from "./advantagesReducer";
import deliverablesReducer from "./deliverablesReducer";

export default combineReducers({
  citiesReducer,
  servicesReducer,
  salonsReducer,
  mastersReducer,
  stylesReducer,
  masterIdReducer,
  masterRecordReducer,
  advantagesReducer,
  deliverablesReducer
});