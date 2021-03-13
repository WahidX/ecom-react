import { ADD_TO_CART, RM_FROM_CART, CLEAR_CART } from '../actions/actionTypes';

const initialState = {
  items: {},
  total: 0,
  count: 0,
  loading: false,
  error: null,
};

/*

Structure of items

items = {
  '1231231ID':{
    index: 2
    price: 1000,
    qty: 3,
  }
}

*/

export default function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      let items = state.items;
      if (items[action.id]) {
        items[action.id] = {
          price: action.price,
          index: action.index,
          qty: items[action.id].qty + 1,
        };
      } else {
        items[action.id] = {
          price: action.price,
          index: action.index,
          qty: 1,
        };
      }
      return {
        ...state,
        items,
        total: state.total + action.price,
        count: state.count + 1,
      };
    case RM_FROM_CART:
      let rmitems = state.items;
      if (rmitems[action.id] && rmitems[action.id].qty) {
        rmitems[action.id] = {
          index: action.index,
          price: action.price,
          qty: rmitems[action.id].qty - 1,
        };
        return {
          ...state,
          items: rmitems,
          total: state.total - action.price,
          count: state.count - 1,
        };
      } else return state;

    // case CLEAR_ITEM:
    //   let newItems = state.items;
    //   delete newItems[action.id];
    //   return {
    //     ...state,
    //     items: newItems,

    //     }
    //   }

    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
}
