import { CITIES_URL } from '../constants/api';
import { getApi } from "../utils/network";
import { getCitiesActions, getCitiesByIdActions } from "../actions/citiesActions";

/**
 * Get запрос на получение  всех городов
*/
export const getCitiesThunk = () => async (dispatch) => {
  dispatch(getCitiesActions.start());

  const res = await getApi(CITIES_URL);
  if (!res.ok) {
    dispatch(getCitiesActions.success(res.data));
    return res.data;
  }
  dispatch(getCitiesActions.failure(res));
  return res;
}

export const getCitiesByIdThunk = (id) => async (dispatch) => {
  dispatch(getCitiesByIdActions.start());

  const res = await getApi(`${CITIES_URL}/${id}`);
  if (!res.ok) {
    dispatch(getCitiesByIdActions.success(res.data));
    return res.data;
  }
  dispatch(getCitiesByIdActions.failure(res));
  return res;
}





// export const ApiHoc = async (url, actions, dispatch) => {
//   dispatch(getCitiesStartAction());

//   const res = await getApi('/api/v1/cities');
//   if (!res.ok) {
//     dispatch(getCitiesSuccessAction(res.data));
//     return res.data;
//   }
//   dispatch(getCitiesFailureAction(res));
//   return res;
// }

