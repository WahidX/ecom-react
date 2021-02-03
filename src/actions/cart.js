import { ADD_TO_CART, RM_FROM_CART, CLEAR_CART } from './actionTypes';

import { setSnackBar } from './snackbar';

export function addToCart(id, price) {
  return {
    type: ADD_TO_CART,
    id,
    price,
  };
}

export function rmFromCart(id, price) {
  return {
    type: RM_FROM_CART,
    id,
    price,
  };
}
