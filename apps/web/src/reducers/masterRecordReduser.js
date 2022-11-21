import { MASTER_RECORD } from '../actions/masterRecordAction';

const initialStore = {}

export default function masterRecoredReducer(store = initialStore, action) {
    switch (action.type) {
        case MASTER_RECORD: {
            return {
                ...store, action
            }
        }
        default:
            return store;
    }
}