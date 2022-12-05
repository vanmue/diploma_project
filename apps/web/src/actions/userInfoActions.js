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
    console.log(date)
    fetch(`/api/v1/users/${date.id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: date.name,
            surname: date.surname,
            email: date.email,
            phone: date.phone,
            password: date?.password,
            avatarId: 0
        })
    })
        .then(res => res.json())
        .then(res => console.log(res))
}