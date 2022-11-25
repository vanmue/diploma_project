export const GET_GROUPS_SERVICES = '@@salons/GET_GROUPS_SERVICES';


/**
 * Группы услуг
*/
export const getServicesGroupsAction = (date) => ({
  type: GET_GROUPS_SERVICES,
  payload: date
});
/**
 * Get запрос на получение массива групп услуг
*/
export const getServicesGroupsThunk = () => async (dispatch, getState) => {
  fetch('/api/v1/deliverable-groups')
    .then(req => req.json())
    .then(res => {
      dispatch(getServicesGroupsAction(res.data));
    })
  // .catch(console.log('getServicesGroupsThunk: ', 'Что-то не получилось'))
}