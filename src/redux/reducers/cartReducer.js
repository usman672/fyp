import * as types from '../types';

const initialState = {
  isLogedin: false,
  cartProducts: [],
};

function addressReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADDTOCART:
      state.cartProducts.push(action.payload.recentProduct);
      return {
        ...state,
        cartProducts: state.cartProducts,
      };
    case types.GETCARTPRODUCTS:
      return {
        ...state,
        cartProducts: action.payload.cartProducts,
      };
    case types.REMOVEFROMCART:
      state.cartProducts.splice(action.payload.deleteIndex, 1);
      return {
        ...state,
        cartProducts: state.cartProducts,
      };
    case types.SETEMPTYCART:
      return {
        ...state,
        cartProducts: [],
      };
  }

  return state;
}
export default addressReducer;
