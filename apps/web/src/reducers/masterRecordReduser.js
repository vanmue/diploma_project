import { MASTER_RECORD } from '../actions/masterRecordAction';

const initialStore = {
    record: null
}

export default function masterRecordReducer(store = initialStore, action) {
    switch (action.type) {
        case MASTER_RECORD: {
            console.log(action)
            return {
                ...store,
                record: action.payload
            }
        }
        default:
            return store;
    }
}