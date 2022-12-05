export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_INFO = 'SET_USER_INFO'


export const getUserAction = (date) => ({
    type: GET_USER_INFO,
    payload: date
})

export const setUserAction = (date) => ({
    type: SET_USER_INFO,
    payload: date
})

export const getUserThunk = (date) => async (dispatch, getState) => {
    fetch(`/api/v1/users/${date}`)
        .then(req => req.json())
        .then(res => {
            dispatch(getUserAction(res.data));
        })
}

export const setUserThunk = (date) => async (dispatch, getState) => {
    fetch(`/api/v1/users/${date}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "string",
            surname: "string",
            email: "string",
            password: "string",
            avatarId: 0
        })
    })
        .then(res => res.json())
        .then(res => console.log(res))
}