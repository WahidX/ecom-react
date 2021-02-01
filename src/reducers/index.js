import { combineReducers } from 'redux';
import products from './products';
import snackbar from './snackbar';

export default combineReducers({
  products,
  snackbar,
});
