export const USER_INFO = 'USER_INFO'

export const getUserAction = (date) => ({
    type: USER_INFO,
    payload: date
})
export const getUserThunk = (date) => async (dispatch, getState) => {
    fetch(`/api/v1/users/${date}`)
        .then(req => req.json())
        .then(res => {
            dispatch(getUserAction(res.data));
        })
}