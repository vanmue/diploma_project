export const USER_INFO = 'URER_INFO'

export const getUserAction = (date) => ({
    type: USER_INFO,
    payload: date
})
export const getUserThunk = (userId) => async (dispatch, getState) => {
    fetch(`/api/v1/appointments/?master_id=${userId}`)
        .then(req => req.json())
        .then(res => {
            dispatch(getUserAction(res.data[0]));
        })
}