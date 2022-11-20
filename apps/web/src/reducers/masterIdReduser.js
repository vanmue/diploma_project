import { GET_MASTER_ID } from '../actions/masterRecordAction';

const initialStore = {
    id: 2
}

export default function masterIdReducer(store = initialStore, action) {
    switch (action.type) {
        case GET_MASTER_ID: {
            return {
                ...store,
                user: {
                    ...action.peyload
                }
            }
        }
        default:
            return store;
    }
}