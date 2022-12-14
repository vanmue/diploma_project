import { GET_MASTER_FROM_USER } from '../actions/masterIdFromUserIdActions';

const initialStore = {
    masterId: null
}

export default function masterIdFromUserIdReducer(store = initialStore, action) {
    switch (action.type) {

        case GET_MASTER_FROM_USER: {
            return {
                ...store,
                masterId: action.payload
            }
        }

        default:
            return store;
    }
}