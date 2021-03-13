import { ADD_TO_CART, RM_FROM_CART, CLEAR_CART } from './actionTypes';

import { setSnackBar } from './snackbar';

export function addToCart(alert, id, price, index) {
  return (dispatch) => {
    console.log(alert);
    dispatch(addToCartAction(id, price, index));
    if (alert) dispatch(setSnackBar('success', 'Added to cart!', 2000));
  };
}

export function rmFromCart(alert, id, price, index) {
  return (dispatch) => {
    console.log(alert);
    dispatch(rmFromCartAction(id, price, index));
    if (alert) dispatch(setSnackBar('success', 'Removed from cart', 2000));
  };
}

export function addToCartAction(id, price, index) {
  return {
    type: ADD_TO_CART,
    id,
    price,
    index,
  };
}

export function rmFromCartAction(id, price, index) {
  return {
    type: RM_FROM_CART,
    id,
    price,
    index,
  };
}
