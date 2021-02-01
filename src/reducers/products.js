// import {
// 	START_SEARCH,
// 	SEARCH_SUCCESS,
// 	SEARCH_FAILED,
// 	SEARCH_CLEAR,
//   } from '../actions/actionTypes';

const initialState = {
  postResults: [],
  userResults: [],
  loading: false,
  error: null,
};

export default function products(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
