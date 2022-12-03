import { USER_INFO } from '../actions/userInfoActions'

const initialStore = {
    userId: 7,
    dataUser: null
}

export default function userInfoReducer(store = initialStore, action) {

    switch (action.type) {
        case USER_INFO: {
            return {
                ...store,
                dataUser: action.payload
            }
        }

        default:
            return store;
    }
}