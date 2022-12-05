import { GET_USER_INFO } from '../actions/userInfoActions';
import { SET_USER_INFO } from '../actions/userInfoActions'

const initialStore = {
    userId: null,
    dataUser: null
}

export default function userInfoReducer(store = initialStore, action) {
    switch (action.type) {
        case GET_USER_INFO: {
            return {
                ...store,
                dataUser: action.payload
            }
        }
        case SET_USER_INFO: {
            return {
                ...store,
                dataUser: action.payload
            }
        }

        default:
            return store;
    }
}