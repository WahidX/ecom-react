import {
  START_FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  TOGGLE_WISHLIST,
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
    case TOGGLE_WISHLIST:
      let removed = false;
      let newWishList = state.wishList.map((item) => {
        if (item.id === action.id) {
          // remove item
          removed = true;
        }
      });
      if (removed) {
        // newWishList.push()
        // from productList having action.id
      }
      return {
        ...state,
        wishList: newWishList,
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
