export const USER_RECORD = 'USER_RECORD';
export const DELETE_RECORD = 'USER_RECORD';

export const getUserRecordAction = (date) => ({
    type: USER_RECORD,
    payload: date
})

export const deleteUserRecordAction = (date) => ({
    type: DELETE_RECORD,
    payload: date
})



export const getUserRecordThunk = (userId) => async (dispatch, getState) => {

    fetch(`/api/v1/users/${userId}/appointments`)
        .then(req => req.json())
        .then(res => {
            dispatch(getUserRecordAction(res.data));
        })
}

export const deleteUserRecordThunk = (appointmentId) => async (dispatch, getState) => {

    fetch(`/api/v1/appointments/${appointmentId}`)
        .then(req => req.json())
        .then(res => {
            dispatch(deleteUserRecordAction(res.data));
        })
}