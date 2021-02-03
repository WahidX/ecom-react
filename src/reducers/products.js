import {
  START_FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  ADD_TO_WISHLIST,
  RM_FROM_WISHLIST,
  CHANGE_PAGE,
} from '../actions/actionTypes';

const initialState = {
  productList: [],
  page: 1,
  wishList: [],
  loading: false,
  error: null,
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case START_FETCH_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.products,
        loading: false,
      };
    case FETCH_PRODUCTS_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishList: [...state.wishList, action.product],
      };
    case RM_FROM_WISHLIST:
      return {
        ...state,
        wishList: state.wishList.filter(
          (product) => product !== action.product
        ),
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
}
