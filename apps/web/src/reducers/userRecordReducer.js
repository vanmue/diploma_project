import { USER_RECORD } from '../actions/userRecordActions';

const initialStore = {
    record: null
}

export default function userRecordReducer(store = initialStore, action) {
    switch (action.type) {
        case USER_RECORD: {
            return {
                ...store,
                record: action.payload
            }
        }
        default:
            return store;
    }
}