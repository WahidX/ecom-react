import { ADD_TO_CART, RM_FROM_CART, CLEAR_CART } from './actionTypes';

import { setSnackBar } from './snackbar';

export function addToCart(id, price, index) {
  return {
    type: ADD_TO_CART,
    id,
    price,
    index,
  };
}

export function rmFromCart(id, price, index) {
  return {
    type: RM_FROM_CART,
    id,
    price,
    index,
  };
}
