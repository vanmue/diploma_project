import { GET_CITIES, GET_CITY_BY_ID } from "./constants";

/**
 * [{}] -  всех городов
*/
export const getCitiesActions = {
  start: () => ({
    type: GET_CITIES.START
  }),
  success: (data) => ({
    type: GET_CITIES.SUCCESS,
    payload: data
  }),
  failure: (error) => ({
    type: GET_CITIES.FAILURE,
    payload: error
  }),
}

/**
 * GET {} - города
*/
export const getCitiesByIdActions = {
  start: () => ({
    type: GET_CITY_BY_ID.START
  }),
  success: (date) => ({
    type: GET_CITY_BY_ID.SUCCESS,
    payload: date
  }),
  failure: (error) => ({
    type: GET_CITY_BY_ID.FAILURE,
    payload: error
  }),
}