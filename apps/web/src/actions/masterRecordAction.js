export const MASTER_RECORD = 'MASTER_RECORD';
export const MASTER_RECORD_MONTH = 'MASTER_RECORD_MONTH';

export const getMasterRecordAction = (date) => ({
    type: MASTER_RECORD,
    payload: date
})

export const getMasterRecordMonthAction = (date) => ({
    type: MASTER_RECORD_MONTH,
    payload: date
})
export const getMasterRecordThunk = (masterId, day) => async (dispatch, getState) => {
    fetch(`/api/v1/masters/${masterId}/appointments/?date=${day}`)
        .then(req => req.json())
        .then(res => {
            dispatch(getMasterRecordAction(res.data));
        })
}

export const getMasterRecordMonthThunk = (masterId) => async (dispatch, getState) => {
    fetch(`/api/v1/masters/${masterId}/appointments`)
        .then(req => req.json())
        .then(res => {
            dispatch(getMasterRecordMonthAction(res.data));
        })
}