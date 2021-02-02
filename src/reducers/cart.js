import { ADD_TO_CART, RM_FROM_CART, CLEAR_CART } from '../actions/actionTypes';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
