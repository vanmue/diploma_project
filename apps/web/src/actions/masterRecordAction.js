export const MASTER_RECORD = 'MASTER_RECORD';

export const getMasterRecordAction = (date) => ({
    type: MASTER_RECORD,
    payload: date
})
export const getMasterRecordThunk = (masterId, salonId, day) => async (dispatch, getState) => {
    fetch(`/api/v1/masters/${masterId}/shops/${salonId}/appointments/?date=${day}`)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            dispatch(getMasterRecordAction(res.data));
        })
}