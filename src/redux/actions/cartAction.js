import * as types from '../types/index';
import Actions from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {
  addToCart,
  deleteFromCart,
  deleteAllFromCart,
  getCartProducts,
} from '../../services/apiList';

export const addToCartAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await addToCart(data);
    if (res.code === 0) {
      dispatch({
        type: types.ADDTOCART,
        payload: {
          recentProduct: res.data.cartData.products[0],
        },
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};

export const deleteFromCartAction = (data, index) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await deleteFromCart(data);
    if (res.code === 0) {
      dispatch({
        type: types.REMOVEFROMCART,
        payload: {
          deleteIndex: index,
        },
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};

export const deleteAllFromCartAction = () => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await deleteAllFromCart();
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};

export const setCartEmpty = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: types.SETEMPTYCART,
    });
  };
};
export const getCartProductsAction = () => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getCartProducts();
    if (res.code === 0) {
      dispatch({
        type: types.GETCARTPRODUCTS,
        payload: {
          cartProducts: res.data.cartData.products,
        },
      });
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
