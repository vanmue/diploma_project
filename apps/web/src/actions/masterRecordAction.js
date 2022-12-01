export const MASTER_RECORD = 'MASTER_RECORD';

export const getMasterRecordAction = (date) => ({
    type: MASTER_RECORD,
    payload: date
})
export const getMasterRecordThunk = (data) => async (dispatch, getState) => {
    fetch(`/api/v1/appointments/?${data}`)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            dispatch(getMasterRecordAction(res.data[0]));
        })
}