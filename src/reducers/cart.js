import { ADD_TO_CART, RM_FROM_CART, CLEAR_CART } from '../actions/actionTypes';

const initialState = {
  quantities: {},
  total: 0,
  loading: false,
  error: null,
};

// quantities = {
//   '1231231ID':{
//     price: 1000,
//     qty: 3,
//   }
// }

export default function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      let quantities = state.quantities;
      if (quantities[action.id]) {
        quantities[action.id] = {
          price: action.price,
          qty: quantities[action.id].qty + 1,
        };
      } else {
        quantities[action.id] = {
          price: action.price,
          qty: 1,
        };
      }
      return {
        ...state,
        quantities,
      };
    case RM_FROM_CART:
      let rmquantities = state.quantities;
      if (rmquantities[action.id] && rmquantities[action.id].qty) {
        rmquantities[action.id] = {
          price: action.price,
          qty: rmquantities[action.id].qty - 1,
        };
      }
      return {
        ...state,
        quantities: rmquantities,
      };

    default:
      return state;
  }
}
