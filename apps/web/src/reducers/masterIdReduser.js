import { GET_MASTER_ID } from '../actions/masterIdAction';

const initialStore = {
    id: 18
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