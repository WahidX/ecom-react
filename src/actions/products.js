import {
  START_FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  CHANGE_PAGE,
  ADD_TO_WISHLIST,
  RM_FROM_WISHLIST,
  EDIT_ITEM,
  CLEAR_WISHLIST,
  DELETE_ITEM,
  ADD_ITEM,
} from './actionTypes';

import axios from 'axios';
import { APIurls } from '../utils/urls';
import { setSnackBar } from './snackbar';
import { rmFromCart, rmFromCartAction } from './cart';

export function fetchProducts() {
  return (dispatch) => {
    dispatch(startFetchProducts());

    var config = {
      method: 'GET',
      url: APIurls.fetchProducts(),
    };

    axios(config)
      .then(function (response) {
        dispatch(fetchProductsSuccess(response.data));
        dispatch(setSnackBar('success', 'Welcome', 3000));
      })
      .catch(function (error) {
        dispatch(fetchProductsFailed(error));
        dispatch(setSnackBar('error', "Couldn't retrieve Products", 3000));
      });
  };
}

export function startFetchProducts() {
  return {
    type: START_FETCH_PRODUCTS,
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products,
  };
}

export function fetchProductsFailed(error) {
  return {
    type: FETCH_PRODUCTS_FAILED,
    error,
  };
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}

export function wishListToggle(type, product) {
  return (dispatch) => {
    if (type === 'add') {
      dispatch(addToWishList(product));
      dispatch(setSnackBar('success', 'Added to Wishlist', 2000));
    } else {
      dispatch(rmFromWishList(product));
      dispatch(setSnackBar('success', 'Removed from Wishlist', 2000));
    }
  };
}

export function addToWishList(product) {
  return {
    type: ADD_TO_WISHLIST,
    product,
  };
}

export function rmFromWishList(product) {
  return {
    type: RM_FROM_WISHLIST,
    product,
  };
}

export function clearWishList() {
  return {
    type: CLEAR_WISHLIST,
  };
}

export function editItem(product, id) {
  return {
    type: EDIT_ITEM,
    product,
    id,
  };
}

export function deleteItem(product, index) {
  return (dispatch) => {
    dispatch(deleteItemAction(product));
    dispatch(rmFromWishList(product));
    // dispatch(rmFromCartAction(product.id, product.price, index));
    dispatch(setSnackBar('success', 'Deleted Successfully', 2000));
  };
}

export function deleteItemAction(product) {
  return {
    type: DELETE_ITEM,
    product,
  };
}

export function addItem(product) {
  return {
    type: ADD_ITEM,
    product,
  };
}
