// import {
//   CHANGE_ACTIVE_PAGE_FOR_PAGINATION,
// } from "../actions/salonsAction";

// const initialStore = {
//   masters: [
//     {
//       rating: 4.5
//     }
//   ]
// }

// export default function salonsReducer(store = initialStore, action) {
//   switch (action.type) {
//     case CHANGE_ACTIVE_PAGE_FOR_PAGINATION: {
//       return {
//         ...store,
//         activePage: action.payload
//       }
//     }
//     default:
//       return store;
//   }
// }