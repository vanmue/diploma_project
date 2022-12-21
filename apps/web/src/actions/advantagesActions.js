import { GET_ADVANTAGES } from "./constants";

/**
 * [{}] -  пркимущества
*/
export const getShopAdvantagesActions = {
  start: () => ({
    type: GET_ADVANTAGES.START
  }),
  success: (data) => ({
    type: GET_ADVANTAGES.SUCCESS,
    payload: data
  }),
  failure: (error) => ({
    type: GET_ADVANTAGES.FAILURE,
    payload: error
  }),
}
