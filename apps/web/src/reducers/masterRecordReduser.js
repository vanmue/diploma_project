import { MASTER_RECORD } from '../actions/masterRecordAction';
import { MASTER_RECORD_MONTH } from '../actions/masterRecordAction';

const initialStore = {
    record: null,
    recordMonth: null
}

export default function masterRecordReducer(store = initialStore, action) {
    switch (action.type) {
        case MASTER_RECORD: {
            return {
                ...store,
                record: action.payload
            }
        }

        case MASTER_RECORD_MONTH: {
            return {
                ...store,
                recordMonth: action.payload
            }
        }
        default:
            return store;
    }
}