export const GET_MASTER_FROM_USER = 'GET_MASTER_FROM_USER'

export const getMasterIdFromUserIdAction = (date) => ({
    type: GET_MASTER_FROM_USER,
    payload: date
})

export const getMasterIdFromUserIdThunk = (token) => async (dispatch, getState) => {
    fetch(`/api/v1/me/profiles`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(req => req.json())
        .then(res => {
            dispatch(getMasterIdFromUserIdAction(res.data))
        })
}