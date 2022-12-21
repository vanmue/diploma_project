import { SHOP_ADVANTAGES_URL } from "../constants/api";
import { getApi } from "../utils/network";
import { getShopAdvantagesActions } from "../actions/advantagesActions";

/**
 * Get запрос на получение  всех преимуществ
*/
export const getShopAdvantagesThunk = () => async (dispatch) => {
  dispatch(getShopAdvantagesActions.start());

  const res = await getApi(SHOP_ADVANTAGES_URL);
  if (!res.ok) {
    dispatch(getShopAdvantagesActions.success(res.data));
    return res.data;
  }
  dispatch(getShopAdvantagesActions.failure(res));
  return res;
}