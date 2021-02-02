import {
  START_FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  TOGGLE_WISHLIST,
  CHANGE_PAGE,
} from './actionTypes';

import axios from 'axios';
import { APIurls } from '../utils/urls';
import { setSnackBar } from './snackbar';

export function fetchProducts() {
  return (dispatch) => {
    dispatch(startFetchProducts());

    var config = {
      method: 'GET',
      url: APIurls.fetchProducts(),
    };

    axios(config)
      .then(function (response) {
        dispatch(fetchProductsSuccess(response.data.products));
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
