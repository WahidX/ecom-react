import { combineReducers } from 'redux';
import products from './products';
import snackbar from './snackbar';
import cart from './cart';

export default combineReducers({
  products,
  snackbar,
  cart,
});
